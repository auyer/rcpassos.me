<script lang="ts">
  import { onMount } from 'svelte'
  import { messageStore } from '$lib/store/wal'

  import {
    ListKeys,
    ListPrefix,
    PutKeyValue,
    GetKey,
    DeleteKey,
    DeletePrefix,
    DeleteAll
  } from '$lib/services'

  let pannelResults: string

  let messages = Array<string>()

  onMount(() => {
    messageStore.subscribe((currentMessage) => {
      if (messages?.length >= 20) {
        messages.pop()!
      }
      messages = [currentMessage, ...messages]
    })
  })

  const deletePrefix = async ({ detail: { key } }) => {
    const [results, err] = await DeletePrefix({ key })

    if (err) {
      pannelResults = `ERROR: ${JSON.stringify(err)}`
    } else {
      pannelResults = `DELETED ALL KEYS\nWITH PREFIX\n${key}`
    }
  }

  const deleteAll = async () => {
    const [err] = await DeleteAll()

    if (err) {
      pannelResults = `ERROR: ${JSON.stringify(err)}`
    } else {
      pannelResults = `DELETED ALL KEYS`
    }
  }

  const deleteKey = async ({ detail: { key } }) => {
    const [result, err] = await DeleteKey({ key })

    if (err) {
      pannelResults = `ERROR: ${JSON.stringify(err)}`
    } else {
      const value = JSON.stringify(result)
      pannelResults = `DELETED\n${key}\nValue\n${value}`
    }
  }

  const listKeys = async () => {
    const [results, err] = await ListKeys()

    if (err) {
      pannelResults = `ERROR: ${JSON.stringify(err)}`
    } else {
      const values = results.join('\n')
      pannelResults = `LIST\n${values}`
    }
  }

  const listPrefix = async ({ detail: { key } }) => {
    console.log(key)
    const [results, err] = await ListPrefix({ key })

    if (err) {
      pannelResults = `ERROR: ${JSON.stringify(err)}`
    } else {
      const values = results.join('\n')
      pannelResults = `LIST\n${values}`
    }
  }

  const putKey = async ({ detail: { key, value } }) => {
    const err = await PutKeyValue({ key, value })

    if (err) {
      pannelResults = `ERROR: ${JSON.stringify(err)}`
    } else {
      pannelResults = `INSERT\n${key}\nValue\n${value}`
    }
  }

  const getKey = async ({ detail: { key } }) => {
    const [result, err] = await GetKey({ key })

    if (err) {
      pannelResults = `ERROR: ${JSON.stringify(err)}`
    } else {
      const value = JSON.stringify(result)
      pannelResults = `READ\n${key}\nValue\n${value}`
    }
  }

  import WALItems from '$lib/components/KV/WALItems.svelte'
  import KVPannel from '$lib/components/KV/KVPannel.svelte'
  import { Accordion, AccordionItem } from '@skeletonlabs/skeleton'
</script>

<svelte:head>
  <!-- <title>Admin: {name}</title> -->
  <!-- <meta name="description" content={bio} /> -->
</svelte:head>

<div class="mx-auto gap-8">
  <div class="card w-full mx-auto max-w-4xl m-5 p-4">
    <Accordion>
      <AccordionItem open>
        <svelte:fragment slot="summary"
          ><h3 class="h3">In memory Key Value DB with Live feed</h3></svelte:fragment
        >
        <svelte:fragment slot="content">
          <p>
            A KV in memory database built in Rust for learning purposes with a live feed of the WAL
            (Write Ahead Log).
          </p>
          <p>This page has a controll pannel and a WebSocket feed.</p>
          <p>
            The server is hosted in a small free-tier cloud VM, with WAF rules to allow Cloudflare
            proxy as the only ingress point.
          </p>
          <a href="http://github.com/auyer/MemoryKV">github.com/auyer/MemoryKV</a>
          <!-- </p> -->
        </svelte:fragment>
      </AccordionItem>
      <!-- ... -->
    </Accordion>
  </div>

  <container class="w-full mx-auto max-w-4xl grid grid-cols-2 gap-4">
    <KVPannel
      {pannelResults}
      on:listKeys={listKeys}
      on:putKey={putKey}
      on:getKey={getKey}
      on:listPrefix={listPrefix}
      on:deleteKey={deleteKey}
      on:deletePrefix={deletePrefix}
      on:deleteAll={deleteAll}
    />
    <div class="card card-hover p-4 space-y-8">
      <div class="shadow-xl rounded-lg p-4">
        <h2 class="p-4">Live Database feed</h2>
        <div class="card card-hover p-4 overflow-auto">
          <WALItems {messages} />
        </div>
      </div>
    </div>
  </container>
</div>
