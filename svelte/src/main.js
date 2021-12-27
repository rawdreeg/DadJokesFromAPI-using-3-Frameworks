import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		joke: 'Loading...'
	}
});

export default app;