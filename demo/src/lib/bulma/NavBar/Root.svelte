<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    type Props = HTMLAttributes<HTMLElement> & {
        fixed?: 'top' | 'bottom' | undefined;
        transparent?: boolean;
    };

    let { fixed, transparent, class: cssClass, children, ...restProps }: Props = $props();

    $effect(() => {
        if (!fixed) {
            return;
        }
        const appliedClass = `has-navbar-fixed-${fixed}`;
        document.body.classList.add(appliedClass);
        return () => {
            document.body.classList.remove(appliedClass);
        };
    });
</script>

<nav
    class={['navbar', { [`is-fixed-${fixed}`]: !!fixed, 'is-transparent': transparent }, cssClass]}
    {...restProps}
>
    {@render children?.()}
</nav>
