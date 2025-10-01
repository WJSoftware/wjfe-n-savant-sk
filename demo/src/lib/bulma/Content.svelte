<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLElement> & {
        tag?: string;
        children?: Snippet;
    };

    let { tag = "div", children, class: cssClass, ...restProps }: Props = $props();
</script>

<svelte:element this={tag} class={['content', cssClass]} {...restProps}>
    {@render children?.()}
</svelte:element>
