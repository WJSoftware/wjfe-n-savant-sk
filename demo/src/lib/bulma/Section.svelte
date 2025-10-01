<script lang="ts">
    import type { ClassValue, HTMLAttributes } from 'svelte/elements';
    import type { Snippet } from 'svelte';

    type Props = HTMLAttributes<HTMLElement> & {
        children?: Snippet;
        tag?: string;
        class?: ClassValue;
    };
    let { children, tag = 'section', class: cssClass, ...restProps }: Props = $props();
</script>

<svelte:element this={tag} class={['section', cssClass]} {...restProps}>
    {@render children?.()}
</svelte:element>
