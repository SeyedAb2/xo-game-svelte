import App from './App.svelte';

const app = new App({
    target: document.body,
    props: {
        name: 'Seyed Abbas',
        lastName: 'Mossavi',
        language: 'fa'
    }
});

export default app;