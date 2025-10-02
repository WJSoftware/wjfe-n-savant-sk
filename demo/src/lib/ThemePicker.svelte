<script lang="ts">
    import theme from "$lib/state/theme.svelte.js";
    import { fly, slide } from "svelte/transition";

    const themeIcons = {
        light: "fa-sun",
        dark: "fa-moon",
        system: "fa-desktop",
    };

    let label = $derived(`${theme.current} theme`);
</script>

<button onclick={() => theme.nextTheme()} aria-label={label} title={label}>
    {#key theme.current}
        <i class={['fas', themeIcons[theme.current]]} transition:fly={{ y: 30, duration: 600 }}></i>
    {/key}
</button>

<style>
    button {
        display: grid;
        padding: 0.7em;
        & > i {
            grid-area: 1 / 1 / 2 / 2;
        }
    }
</style>