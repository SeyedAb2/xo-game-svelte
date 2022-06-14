import { derived, get, writable } from 'svelte/store';
import axios from 'axios';

let temp;
let gameTemp = undefined;
if (!localStorage.getItem('playerJWT') || localStorage.getItem('playerJWT') == "undefined") {
    temp = undefined;
} else {
    let jwtToken = JSON.parse(localStorage.getItem('playerJWT'));
    let newToken = { identifier: jwtToken.player.email, password: window.atob(jwtToken.player.pass) }
    let player = { email: newToken.identifier, pass: window.btoa(newToken.password) };
    temp = axios.post("https://xo-backend-soroosh.fandogh.cloud/auth/local", {
            identifier: newToken.identifier,
            password: newToken.password
        })
        .then(response => {
            response.data;
            userStore.set(response.data);
            localStorage.setItem('playerJWT', JSON.stringify({ response, player }))
        });
}
// let gameTemp = { "id": 147, "code": "iqKc", "player1": { "id": 97, "username": "asds@dasd.ssd", "email": "asds@dasd.ssd", "provider": "local", "password": "$2a$10$17f2JDlo2J.01.8cuh4OR.XS.r8jjC/79xrk1PYhE7WwP4RLX6m86", "resetPasswordToken": null, "confirmationToken": null, "confirmed": true, "blocked": null, "role": 1, "created_by": null, "updated_by": null, "created_at": "2022-06-13T03:43:32.618Z", "updated_at": "2022-06-13T03:43:32.626Z" }, "player2": [], "turn": null, "size": 3, "winner": null, "published_at": "2022-06-13T03:43:34.088Z", "created_by": null, "updated_by": null, "created_at": "2022-06-13T03:43:34.089Z", "updated_at": "2022-06-13T03:43:34.098Z", "moves": [] };
const userStore = writable(temp);
const gameStore = writable(gameTemp);
export const user = {
    subscribe: userStore.subscribe,
    login: (userInput) => {
        const responsePromise = axios.post("https://xo-backend-soroosh.fandogh.cloud/auth/local", {
                identifier: userInput.email,
                password: userInput.password
            })
            .then(response => {
                userStore.set(response.data);
                let player = { email: userInput.email, pass: window.btoa(userInput.password) };
                localStorage.setItem('playerJWT', JSON.stringify({ response, player }))
            })
        return responsePromise;
    },
    register: (userInput) => {
        const responsePromise = axios.post("https://xo-backend-soroosh.fandogh.cloud/auth/local/register", {
                ...userInput,
                username: userInput.email
            })
            .then(response => {
                userStore.set(response.data);
                let player = { email: userInput.email, pass: window.btoa(userInput.password) };
                localStorage.setItem('playerJWT', JSON.stringify({ response, player }))
            })

        return responsePromise;
    },
    exit: () => {
        userStore.set(undefined),
            localStorage.setItem('playerJWT', 'undefined')
    }
}
export const game = {
    subscribe: gameStore.subscribe,
    newGame: (jwtToken) => {
        return axios.post(
            "https://xo-backend-soroosh.fandogh.cloud/games", { size: 3 }, { headers: { 'Authorization': `Bearer ${jwtToken}` } }).then(
            response => gameStore.set(response.data)
        );
    },
    joinGame: (jwtToken, gameCode) => {
        return axios.post(
            `https://xo-backend-soroosh.fandogh.cloud/games/${gameCode}/join`, {}, { headers: { 'Authorization': `Bearer ${jwtToken}` } }).then(
            response => gameStore.set(response.data)
        );
    }
}
export const board = derived([userStore, gameStore], ([$user, $game], set) => {
    if ($user, $game) {
        const interval = setInterval(() => {
            axios.get(`https://xo-backend-soroosh.fandogh.cloud/games/${$game.code}`, { headers: { 'Authorization': `Bearer ${$user.jwt}` } }).then(
                response => set(response.data)
            )
        }, 500)
        return () => {
            clearInterval(interval)
        }
    }
}, get(gameStore))

export const moveUpdate = (cell, board, user) => {
    console.log(cell)
    return axios.post(`https://xo-backend-soroosh.fandogh.cloud/moves`, {
        ...cell,
        game: board.code,
    }, { headers: { 'Authorization': `Bearer ${user.jwt}` } })
}