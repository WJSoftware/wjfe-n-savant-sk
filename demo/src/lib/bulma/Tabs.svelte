<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        children?: Snippet;
    };

    let { children, class: cssClass, ...restProps }: Props = $props();
</script>

<div class={["tabs", cssClass]} {...restProps}>
    <ul role="tablist">
        {@render children?.()}
    </ul>
</div>
