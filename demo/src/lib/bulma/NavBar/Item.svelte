<script lang="ts" generics="T extends 'a' | 'div' = 'div'">
    import type { HTMLAttributes, HTMLAnchorAttributes } from 'svelte/elements';

    type Props = (T extends 'a' ? HTMLAnchorAttributes : HTMLAttributes<HTMLDivElement>) & {
        tag?: T;
        isActive?: boolean;
        isTab?: boolean;
    };

    let { tag = 'div' as T, isActive, isTab, class: cssClass, children, ...restProps }: Props = $props();
</script>

<svelte:element this={tag} class={['navbar-item', cssClass, { 'is-active': isActive, 'is-tab': isTab }]} {...restProps}>
    {@render children?.()}
</svelte:element>
