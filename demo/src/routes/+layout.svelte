<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { init } from '@wjfe/n-savant-sk';
	import { Link, location, Router } from '@wjfe/n-savant';
	import { onDestroy } from 'svelte';

	let { children } = $props();
	console.debug('Layout component initialized');
	const cleanup = init();
	onDestroy(() => {
		console.debug('Layout component destroyed');
		cleanup();
	});
	console.debug('Location:', location);

	function navigate(to: string) {
		location.navigate(to);
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Router>
	<Link href="/">Home</Link>
	<Link href="/about">About</Link>
	<a href="#/">Home</a>
	<a href="#/about">About</a>
	<hr />
	<button type="button" onclick={() => navigate('/')}>Home</button>
	<button type="button" onclick={() => navigate('/about')}>About</button>
	{@render children?.()}
</Router>
