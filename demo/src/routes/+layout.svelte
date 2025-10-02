<script lang="ts">
	import '@fortawesome/fontawesome-free/css/all.css';
	import favicon from '$lib/assets/favicon.svg';
	import './main.scss';
	import { init, type SkInitOptions } from '@wjfe/n-savant-sk';
	import NavBar from '$lib/NavBar.svelte';
	import theme from '$lib/state/theme.svelte.js';
	import { page } from '$app/state';

	let { children } = $props();
	let hashMode: SkInitOptions['hashMode'] = 'single';
	if (page.url.searchParams.has('multi')) {
		hashMode = 'multi' as const;
	}
	init({ hashMode });
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class={{ 'theme-dark': theme.current === 'dark' }}>
	<div class="container is-max-widescreen">
		<NavBar />
		<main>
			{@render children?.()}
		</main>
	</div>
</div>

<style>
</style>
