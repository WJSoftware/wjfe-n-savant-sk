<script lang="ts">
    import { NavBar } from '$lib/bulma/NavBar';
    import { calculateSkHref } from '@wjfe/n-savant-sk';
    import ThemePicker from './ThemePicker.svelte';
    import logo from '@wjfe/n-savant/logo64';
    import { isSkRouteActive } from './isSkRouteActive';
    import { location } from '@wjfe/n-savant';
    import theme from './state/theme.svelte';

    const allPositions = [undefined, 'top', 'bottom'] as const;
    let posIndex = $state(0);
    const posIconData = [
        {
            icon: 'fa-circle-dot',
            title: 'Remove fixed position',
        },
        {
            icon: 'fa-chevron-up',
            title: 'Fix to top',
        },
        {
            icon: 'fa-chevron-down',
            title: 'Fix to bottom',
        },
    ];
    let iconDataIndex = $derived((posIndex + 1) % allPositions.length);
    let navbarBg = $derived(theme.current === 'dark' ? 'is-dark' : 'is-light');

    function nextPosition() {
        posIndex = (posIndex + 1) % allPositions.length;
    }
</script>

<NavBar.Root fixed={allPositions[posIndex]} class={navbarBg} style="padding-top: 0.5rem; padding-bottom: 0.5rem;">
    <NavBar.Brand>
        <NavBar.Item>
            <img src={logo} alt="Logo" />
        </NavBar.Item>
        <NavBar.Item>
            <h1 class="title is-4">@wjfe/n-savant-sk Demo</h1>
        </NavBar.Item>
    </NavBar.Brand>
    <NavBar.Burger />
    <NavBar.Menu>
        <NavBar.Item tag="a" isTab isActive={isSkRouteActive('/')} href={calculateSkHref({ preserveQuery: true }, '/')}
            >Home</NavBar.Item
        >
        <NavBar.Item
            tag="a"
            isTab
            isActive={isSkRouteActive('/demo')}
            href={calculateSkHref({ preserveQuery: true }, '/demo')}>Start Demo</NavBar.Item
        >
        {#snippet end()}
            <NavBar.Item>
                Sveltekit Path: <code>{location.url.pathname}</code>
            </NavBar.Item>
            <NavBar.Item>
                <button type="button" title={posIconData[iconDataIndex].title} onclick={nextPosition}>
                    <i class={['fas', posIconData[iconDataIndex].icon]}></i>
                </button>
            </NavBar.Item>
            <NavBar.Item>
                <ThemePicker />
            </NavBar.Item>
        {/snippet}
    </NavBar.Menu>
</NavBar.Root>
