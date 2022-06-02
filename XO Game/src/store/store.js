import { writable } from 'svelte/store';
const userStore = writable(undefined);

export const user = {
    subscribe: userStore.subscribe,
    login: (userInput) => {},
    register: (userInput) => {}
}