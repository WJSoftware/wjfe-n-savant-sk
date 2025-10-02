<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        end?: Snippet;
    };

    let {
        class: cssClass,
        end,
        children,
        ...restProps
    }: Props = $props();
</script>

<div class={["navbar-menu", cssClass]} {...restProps}>
    <div class="navbar-start">
        {@render children?.()}
    </div>
    {#if end}
        <div class="navbar-end">
            {@render end()}
        </div>
    {/if}
</div>
