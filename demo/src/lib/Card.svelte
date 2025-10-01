<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        children?: Snippet;
        header?: Snippet | string;
        footer?: Snippet;
    };

    let { children, header, footer }: Props = $props();
</script>

<div class="card">
    {#if header}
        <header class="card-header">
            {#if typeof header === 'string'}
                <p class="card-header-title">{header}</p>
            {:else}
                {@render header?.()}
            {/if}
        </header>
    {/if}
    <div class="card-content">
        {@render children?.()}
    </div>
    {#if footer}
        <footer class="card-footer">
            {@render footer?.()}
        </footer>
    {/if}
</div>