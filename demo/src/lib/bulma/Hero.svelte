<script lang="ts">
    import type { Snippet } from "svelte";
    import type { ClassValue, HTMLAttributes } from "svelte/elements";
    import { type IsColor, type IsSize } from "./common";

    type Props = HTMLAttributes<HTMLElement> & {
        children?: Snippet;
        tag?: string;
        isColor?: IsColor;
        isSize?: IsSize;
        class?: ClassValue;
    };

    let { children, tag = 'section', isColor, isSize, class: cssClass, ...restProps }: Props = $props();
</script>

<svelte:element this={tag} class={['hero', isColor, isSize, cssClass]} {...restProps}>
    <div class="hero-body">
        {@render children?.()}
    </div>
</svelte:element>
