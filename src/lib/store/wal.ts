import { writable } from 'svelte/store'
import { browser } from '$app/environment'

export const messageStore = writable('Connecting to WAL endpoint')

// const API_ENDPOINT = 'ws://localhost:8080';
const API_ENDPOINT = 'wss://kv.rcpassos.me'

if (browser) {
  const socket = new WebSocket(API_ENDPOINT + '/wal')

  // Connection opened
  socket.addEventListener('open', function (event) {
    messageStore.set('Connected')
  })

  // Listen for messages
  socket.addEventListener('message', function (event) {
    messageStore.set(event.data)
  })
}
