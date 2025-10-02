<script lang="ts">
    import Section from '$lib/bulma/Section.svelte';
    import Tabs from '$lib/bulma/Tabs.svelte';
    import { activeBehavior, Link, LinkContext, location, Route, Router, type Hash, type RouteStatus } from '@wjfe/n-savant';
    import Intro from './Intro.svelte';
    import Struct from './Struct.svelte';
    import InCode from './InCode.svelte';
    import FallbackContent from './FallbackContent.svelte';

    type Props = {
        hash: Exclude<Hash, false>;
    }
    let {
        hash,
    }: Props = $props();

    let hashPath = $derived(hash === true ? location.hashPaths.single : location.hashPaths[hash] );
</script>

<Section>
    <header class="is-flex is-justify-content-space-between">
        <span>&nbsp;</span>
        <span>
            <strong>Hash path:</strong>
            <code>{typeof hash === 'string' ? `${hash}=` : ''}{hashPath || '/'}</code>
        </span>
    </header>
    <div class="box">
        <Router {hash}>
            {#snippet children(state, rs)}
                <Tabs>
                    <LinkContext prependBasePath>
                        <li role="tab" {@attach activeBehavior(rs, { key: 'intro', class: 'is-active' })}><Link {hash} href="/">Intro</Link></li>
                        <li role="tab" {@attach activeBehavior(rs, { key: 'struct', class: 'is-active' })}><Link {hash} href="/struct">Structure</Link></li>
                        <li role="tab" {@attach activeBehavior(rs, { key: 'in-code', class: 'is-active' })}><Link {hash} href="/in-code">In Code</Link></li>
                        <li role="tab" {@attach activeBehavior(rs, { key: '404', class: 'is-active' })}><Link {hash} href="/404">404</Link></li>
                    </LinkContext>
                </Tabs>
                <Route {hash} key="intro" path="/">
                    <Intro />
                </Route>
                <Route {hash} key="struct" path="/struct">
                    <Struct />
                </Route>
                <Route {hash} key="in-code" path="/in-code">
                    <InCode />
                </Route>
                <FallbackContent {hash} />
            {/snippet}
        </Router>
    </div>
</Section>
