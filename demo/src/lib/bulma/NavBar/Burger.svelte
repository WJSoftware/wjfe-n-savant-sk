<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements";

    type Props = Omit<HTMLButtonAttributes, 'children'> & {
        lineCount?: number;
    };

    let {
        lineCount = 4,
        class: cssClass,
        ...restProps
    }: Props = $props();
</script>

<button
    class={["navbar-burger", cssClass]}
    {...restProps}
    aria-label="menu"
    aria-expanded="false"
>
    {#each { length: lineCount } as _, i}
        <span aria-hidden="true"></span>
    {/each}
</button>
