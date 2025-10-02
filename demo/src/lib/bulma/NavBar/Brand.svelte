<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement>;

    let {
        class: cssClass,
        children,
        ...restProps
    }: Props = $props();
</script>

<div class={["navbar-brand", cssClass]} {...restProps}>
    {@render children?.()}
</div>
