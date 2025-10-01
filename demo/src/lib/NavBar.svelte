<script lang="ts">
    import theme from '$lib/state/theme.svelte.js';
    import { calculateSkHref } from "@wjfe/n-savant-sk";

</script>
<nav class="has-background-info-light is-flex is-flex-direction-row is-align-items-center is-justify-content-space-between">
    <ul>
        <li><a href={calculateSkHref({ preserveQuery: true }, "/")}>Home</a></li>
        <li><a href={calculateSkHref({ preserveQuery: true }, "/demo")}>Start Demo</a></li>
    </ul>
    <div>
        <select bind:value={theme.current} class="select">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
        </select>
    </div>
</nav>

<style>
    nav {
        padding: 1rem;
        border-bottom: 1px solid #dee2e6;
    }

    ul {
        list-style: none;
        display: flex;
        gap: 1rem;
        margin: 0;
        padding: 0;
    }

    li {
        margin: 0;
    }
</style>
