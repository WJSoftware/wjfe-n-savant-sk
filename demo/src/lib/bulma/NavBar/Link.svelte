<script lang="ts">
    import type { HTMLAnchorAttributes } from "svelte/elements";

    type Props = HTMLAnchorAttributes;

    let {
        class: cssClass,
        children,
        ...restProps
    }: Props = $props();
</script>

<a class={['navbar-link', cssClass]} {...restProps}>
    {@render children?.()}
</a>
