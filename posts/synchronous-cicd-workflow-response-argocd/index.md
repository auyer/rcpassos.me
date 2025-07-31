---
title: Synchronous CI/CD results for K8S Deployments with ArgoCD
date: 2025-07-31
---

> This will be a short one.
> ArgoCD syncronizes application status in Kubernetes, usually tracking a git commit or helm chart tag.
> When building and deploying from a CI/CD workflow, I want an instant success/failure response.
> This post describes how I did it.

## A Push inclined workflow

My deployment strategy looks quite common for CI/CD workflows, although a bit uncommon (as far as I know) for ArgoCD.
It is a common practice to have files updated by workflows in specific repositories or branches, and ArgoCD tracks it.
This is not what I did.

I started deploying apps to different systems, where pushing an update is far more common than expecting the system to watch a git repository.
This more traditional method is also what my team is used to.

I aim to keep the push-based structure running a workflow based on a push, or even a "tag/release".
But I still want to benefit from ArgoCD auto-sync, and its great user interface.

## Describing my workflow

The first steps are ordinary: my workflow builds and pushes an OCI Container image, tagged with the commit, to a private repository.
To start integrating with ArgoCD, an "application" entity should be created.
This can be done through the UI, but I much prefer **everything to be defined as code**.

There is a file in my git repository that will be used to tell ArgoCD where my application is, and what commit it should use.
This is an abridged version of the YAML definition of an Argo application:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: app-name
  namespace: argocd
spec:
  source:
    repoURL: 'git@github.com:org/app.git'
    path: apps/app-name
    targetRevision: #{COMMIT}#
    helm:
      parameters:
        - name: app-name.image.tag
          value: #{COMMIT}#
```

If you think the `#{COMMIT}#` field is a template, you got it.
After completing the build, I replace these anchors with the actual commit sha1, and run a `kubectl apply -f ${{ inputs.argo_applications_path }}`.
And yes, `${{ inputs.argo_applications_path }}` is the syntax for the input variable usage in GitHub Actions.
This action I built is shared across many systems; this is how I tell the workflow where the application YAML is.

At this point, Argo is tracking the helm chart in a specific commit and running an image tagged with the same value.
This is sufficient to deploy a newly built image to Kubernetes, without hard-coding a git SHA or tag to any file.
Everything runs asynchronously from here, and a failure will not be reported.

## Retrieving Synchronous Responses

This section will describe my changes to ensure tight integration between my workflow and ArgoCD.

ArgoCD had a CLI available, with two helpful commands: `argocd app sync` and `argocd app wait`.
The first starts a manual sync operation for the app.
This is equivalent to clicking the Sync button on the Web UI.
Starting a sync usually puts the application in the `Progressing` state.
The second command monitors this state until the application goes healthy (or fails).

The idea is then to connect to ArgoCD and run these commands.
But there are a couple of gotchas that I will deal with:

1. My ArgoCD instance is not exposed to the public internet
2. Changing the pinned git commit may start the ArgoCD sync automatically.

### Step by Step

First, the ArgoCD CLI should be installed in the setup phase of the workflow (before running actual operations).
This is the step I use in GitHub actions:

```bash
VERSION=v3.0.11 # Select desired TAG from https://github.com/argoproj/argo-cd/releases
curl -sSL -o argocd-linux-amd64 \
 https://github.com/argoproj/argo-cd/releases/download/$VERSION/argocd-linux-amd64
sudo install -m 555 argocd-linux-amd64 /usr/local/bin/argocd
rm argocd-linux-amd64
```

Now, just after running `kubectl apply` to the application resource, we should get the credentials of the Argo user.
This example below uses `kubectl` to read the default admin user saved in a k8s secret.
This can be used to access a custom user who is creating a similar secret or using the secret storage of your CI/CD tool.

```bash
# read the user and password from the k8s secret
ARGOCD_PASSWORD=$(kubectl get secret argocd-initial-admin-secret \
         -n argocd -o jsonpath="{.data.password}" | base64 -d && echo)
ARGOCD_USERNAME=$(kubectl get secret argocd-initial-admin-secret \
         -n argocd -o jsonpath="{.data.username}" | base64 -d && echo)
```

Since this workflow is shared across multiple applications, these next steps will read the application name and namespace from its YAML file.
It is the relative path to the application YAML definition.

```bash
APP_NAME=$(cat ${{ inputs.argo_applications_path }} | yq -r .metadata.name)
APP_NAMESPACE=$(cat ${{ inputs.argo_applications_path }} | yq -r .metadata.namespace)
echo "Running sync for $APP_NAME"
```

To connect to ArgoCD, we will use kubectl to forward the port to the Argo service.
Using the credentials we collected before, we can authenticate to the API.
Note that no HTTPS certificate validation can occur since we are using the http port and a local domain (localhost).
The `--insecure --plaintext` flags deal with this.
This is not an issue, because the tunnel opened by kubectl is encrypted with TLS.

```bash
# ensure argo cli will use the correct namespace
kubectl config set-context --current --namespace=argocd
# binds port 80 from argocd service to local port 8080, in background
kubectl port-forward svc/argocd-server 8080:80 -n argocd & \
# waits up to 60s for the port to be open, using netcat to check
timeout 60 sh -c 'until nc -z $0 $1; do sleep 1; done' localhost 8080 && \
echo "Tunnel open" && \
argocd login localhost:8080 \
 --username ${ARGOCD_USERNAME} \
 --password ${ARGOCD_PASSWORD} \
 --insecure --plaintext --http-retry-max 3 --core
```

At this point, we are connected and authenticated with ArgoCD.
We will call the sync command.
But it is possible that the `sync` progress started automatically after applying the application YAML.
If so, ArgoCD will return an error, with status code 20.
We run sync and check the code.
If it runs, we run `wait` before syncing manually.

```bash
argocd app sync ${APP_NAME} -N ${APP_NAMESPACE} || {
 status=$?
 # if Sync already running, status 20 is returned
 if [ $status -eq 20 ]; then
   echo "Sync in progress. Running wait before re-issuing a sync."
   argocd app wait ${APP_NAME} -N ${APP_NAMESPACE} && \
   argocd app sync ${APP_NAME} -N ${APP_NAMESPACE}
 else
   echo "Command failed with a different error."
   exit $status
 fi
} && \
# now wait for the final status to be reported
argocd app wait ${APP_NAME} -N ${APP_NAMESPACE}
```

## Complete script

The steps described above provide a way to get results from ArgoCD synchronously, and get instant results from the deployment workflow.
To put it all together, take this following script and run in a bash step.

```bash
set -o pipefail
APP_NAME=$(cat ${{ inputs.argo_applications_path }} | yq -r .metadata.name)
APP_NAMESPACE=$(cat ${{ inputs.argo_applications_path }} | yq -r .metadata.namespace)
echo "Running sync for $APP_NAME"

ARGOCD_PASSWORD=$(kubectl get secret argocd-initial-admin-secret -n argocd \
           -o jsonpath="{.data.password}" | base64 -d && echo)
ARGOCD_USERNAME=$(kubectl get secret argocd-initial-admin-secret -n argocd \
           -o jsonpath="{.data.username}" | base64 -d && echo)

# ensure argo cli will use the correct namespace
kubectl config set-context --current --namespace=argocd
# binds port 80 from argocd service to local port 8080, in background
kubectl port-forward svc/argocd-server 8080:80 -n argocd & \
# waits up to 60s for the port to be open, using netcat to check
timeout 60 sh -c 'until nc -z $0 $1; do sleep 1; done' localhost 8080 &&\
echo "Tunnel open" &&\
argocd login localhost:8080 \
 --username ${ARGOCD_USERNAME} \
 --password ${ARGOCD_PASSWORD} \
 --insecure --plaintext --http-retry-max 3 --core
# if Sync already running, status 20 is returned
argocd app sync ${APP_NAME} -N ${APP_NAMESPACE} || {
 status=$?
 if [ $status -eq 20 ]; then
   echo "Sync in progress. Running wait before re-issuing a sync"
   argocd app wait ${APP_NAME} -N ${APP_NAMESPACE} && \
   argocd app sync ${APP_NAME} -N ${APP_NAMESPACE}
 else
   echo "Command failed with a different error."
   exit $status
 fi
} && \
# now wait for the final status to be reported
argocd app wait ${APP_NAME} -N ${APP_NAMESPACE}
```
