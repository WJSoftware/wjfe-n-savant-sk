<script lang="ts">
    // import { init } from "@wjfe/n-savant";
    // import { init } from "$lib/init.js";
    import type { Snippet } from "svelte";

    let {
        children
    }: {
        children?: Snippet;
    } = $props();

    // $effect.pre(() => {
    //     return init();
    // });
</script>

{@render children?.()}
