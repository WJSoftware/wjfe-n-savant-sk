<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import type { IsColor } from "./common";

    type Props = HTMLAttributes<HTMLDivElement> & {
        isColor?: IsColor;
        children?: Snippet;
        isCloseable?: boolean;
        onClose?: () => void;
    };

    let { isColor, children, isCloseable = false, onClose, class: cssClass, ...restProps }: Props = $props();
</script>

<div class={['notification', isColor, cssClass]} {...restProps}>
    {#if isCloseable}
        <button class="delete" aria-label="close" onclick={onClose}></button>
    {/if}
    {@render children?.()}
</div>
