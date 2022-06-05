import { writable } from 'svelte/store';
import axios from 'axios';
let temp = { "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImlhdCI6MTY1NDM1NzEwOSwiZXhwIjoxNjU2OTQ5MTA5fQ.C-XQZRePmkkFc2IhKyKrA7f1uu2El1RUXwQN66I05I0", "user": { "id": 34, "username": "asdsW@asdas.CA", "email": "asdsw@asdas.ca", "provider": "local", "confirmed": true, "blocked": null, "role": { "id": 1, "name": "Authenticated", "description": "Default role given to authenticated user.", "type": "authenticated" }, "created_at": "2022-06-04T15:38:29.390Z", "updated_at": "2022-06-04T15:38:29.396Z" } };
// let temp = undefined;
const userStore = writable(temp);
const gameStore = writable(undefined);
export const user = {
    subscribe: userStore.subscribe,
    login: (userInput) => {
        const responsePromise = axios.post("https://xo-backend-soroosh.fandogh.cloud/auth/local", {
                identifier: userInput.email,
                password: userInput.password
            })
            .then(response => { userStore.set(response.data) })
        return responsePromise;
    },
    register: (userInput) => {
        const responsePromise = axios.post("https://xo-backend-soroosh.fandogh.cloud/auth/local/register", {
                ...userInput,
                username: userInput.email
            })
            .then(response => { userStore.set(response.data) })
        return responsePromise;
    },
    exit: () => { userStore.set(undefined) }
}
export const game = {
    subscribe: gameStore.subscribe,
    newGame: (jwtToken) => {
        axios.post(
            "https://xo-backend-soroosh.fandogh.cloud/games", { size: 3 }, { headers: { 'Authorization': `Bearer ${jwtToken}` } }).then(
            response => gameStore.set(response.data)
        );
    },
    joinGame: (jwtToken) => {}
}