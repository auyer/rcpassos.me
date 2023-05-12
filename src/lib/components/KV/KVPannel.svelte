<script lang="ts">
  export let pannelResults = `There are no results to display yet. \nRun a Read or List to see them here`

  let key: string
  let keyClass: string
  let value: string
  let valueClass: string

  function validateNotNull(value: string): Boolean {
    return value != null && value.length > 0
  }

  function validateKey(): Boolean {
    if (!validateNotNull(key)) {
      keyClass = 'input-error'
      return false
    } else {
      keyClass = 'input-success'
      return true
    }
  }

  function validateValue(): Boolean {
    if (!validateNotNull(value)) {
      valueClass = 'input-error'
      return false
    } else {
      valueClass = 'input-success'
      return true
    }
  }

  function clearClass() {
    keyClass = ''
    valueClass = ''
  }

  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  function listKeys() {
    clearClass()
    dispatch('listKeys')
  }
  function listPrefix() {
    clearClass()
    if (validateKey()) {
      dispatch('listPrefix', {
        key
      })
    }
  }
  function deleteKey() {
    clearClass()
    if (validateKey()) {
      dispatch('deleteKey', {
        key
      })
    }
  }
  function deletePrefix() {
    clearClass()
    if (validateKey()) {
      dispatch('deletePrefix', {
        key
      })
    }
  }
  function deleteAll() {
    clearClass()
    dispatch('deleteAll')
  }
  function putKey() {
    clearClass()
    console.log('key, value', key, value)
    const k = validateKey()
    const v = validateValue()
    if (k && v) {
      dispatch('putKey', {
        key,
        value
      })
    }
  }
  function getKey() {
    clearClass()
    if (validateKey()) {
      dispatch('getKey', {
        key
      })
    }
  }

  let isFocused: boolean = true
  import { focusTrap, CodeBlock } from '@skeletonlabs/skeleton'
</script>

<div class="card card-hover p-4 space-y-4">
  <h2>Interactive area</h2>
  <form use:focusTrap={isFocused}>
    <label class="label">
      <span>Key</span>
      <input class="input {keyClass}" type="text" placeholder="Key" bind:value={key} />
    </label>
    <label class="label">
      <span>Value</span>
      <input class="input {valueClass}" type="text" placeholder="Value" bind:value />
    </label>
  </form>

  <div class="grid grid-cols-2 gap-4 p-4">
    <div class="btn-group variant-filled-primary">
      <button class="justify-center text-center" on:click={getKey}> Read</button>
      <button class="justify-center text-center" on:click={putKey}>Put</button>
    </div>
    <div class="btn-group variant-filled-secondary">
      <button on:click={listKeys}>List</button>
      <button on:click={listPrefix}>ListPrefix</button>
    </div>
  </div>
  <div class="flex items-center justify-center">
    <div class="btn-group variant-filled-warning">
      <button on:click={deleteKey}>Delete</button>
      <button on:click={deletePrefix}>DeletePrefix</button>
      <button on:click={deleteAll}>DeleteAll</button>
    </div>
  </div>
  <div>
    <h2>Results area</h2>
    <CodeBlock code={pannelResults} />
  </div>
</div>
