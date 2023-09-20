import { writable } from 'svelte/store';
import { browser } from '$app/environment';
export const messageStore = writable();
// const API_ENDPOINT = 'ws://localhost:8080';
const API_ENDPOINT = 'ws://kv2.rcpassos.me';

const MAX_ATTEMPTS = 3;

export function openConnection(attempt = 0) {
	if (browser) {
		messageStore.set('Connecting to WAL endpoint');
    const ws = new WebSocket(API_ENDPOINT + '/wal');

    ws.onerror = function (err) {
      console.error('Socket encountered error: ', err, 'Closing socket');
      ws.close();
    };

    ws.onclose = function (e) {
      // simple exponential backoff
      const timeout =  1000 * (attempt ** 2)
      console.log(`Socket is closed. Reconnect will be attempted in ${timeout/1000} second(s).`, e.reason);
      messageStore.set('Reconnecting');
      if (attempt > MAX_ATTEMPTS) {
        console.log("Max reconnection attempts reached")
        messageStore.set('Max reconnection attempts reached');
        return;
      }
      setTimeout(function () {
        openConnection(attempt +1);
      }, timeout);
    };
    
    ws.onopen = function () {
      messageStore.set('Connected');
    };

    ws.onmessage = function (event) {
      messageStore.set(event.data);
    };
	}
};
