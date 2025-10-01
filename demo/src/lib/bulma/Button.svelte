<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";
    import type { IsColor } from "./common";

    type Props = Omit<HTMLButtonAttributes, 'type'> & {
        type?: HTMLButtonAttributes['type'];
        isColor?: IsColor;
        children?: Snippet;
    };

    let { type = 'button', isColor, children, class: cssClass, ...restProps }: Props = $props();
</script>

<button {type} class={['button', cssClass, isColor]} {...restProps}>
    {@render children?.()}
</button>
