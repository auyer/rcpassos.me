import { writable } from 'svelte/store';
import { browser } from '$app/environment';
export const messageStore = writable();
// const API_ENDPOINT = 'ws://localhost:8080';
const API_ENDPOINT = 'wss://memorykv.rcpassos.me';

const MAX_ATTEMPTS = 3;

// message count used to help reactivity in Svelte
// Same message content would not trigger a re-render
let message_count = 0;

export function openConnection(attempt = 0) {
	if (browser) {
    messageStore.set({ content: 'Connecting to WAL endpoint', id: message_count });
    const ws = new WebSocket(API_ENDPOINT + '/wal');

    ws.onerror = function (err) {
      message_count++;
      console.error('Socket encountered error: ', err, 'Closing socket');
      ws.close();
    };

    ws.onclose = function (e) {
      // simple exponential backoff
      const timeout =  1000 * (attempt ** 2)
      console.log(`Socket is closed. Reconnect will be attempted in ${timeout / 1000} second(s).`, e.reason);
      message_count++;
      messageStore.set({ content: 'Reconnecting', id: message_count });
      if (attempt > MAX_ATTEMPTS) {
        console.log("Max reconnection attempts reached")
        messageStore.set({ content: 'Max reconnection attempts reached', id: message_count });
        return;
      }
      setTimeout(function () {
        openConnection(attempt +1);
      }, timeout);
    };
    
    ws.onopen = function () {
      message_count++;
      messageStore.set({ content: "Connected", id: message_count });
    };

    ws.onmessage = function (event) {
      
      message_count++;
      console.log('Message from server ', event.data, { msg: event.data, id: message_count })
      messageStore.set({ content: event.data, id: message_count });
    };
	}
};
