<script lang="ts">
    import Content from '$lib/bulma/Content.svelte';
    import type { Hash } from '@wjfe/n-savant';
    import { SkFallback } from '@wjfe/n-savant-sk';

    type Props = {
        hash: Hash;
    };

    let {
        hash,
    }: Props = $props();
</script>

<SkFallback {hash}>
    {#snippet children(state, rs)}
        <Content role="tabpanel">
            <h3>Fallback Content</h3>
            <p>
                Oops! This is fallback content that is being rendered because no routes in the parent
                <code>&lt;Router&gt;</code> component are currently matched.
            </p>
            <p>
                The following is the current route status object from the parent router:
            </p>
            <pre>{JSON.stringify(rs, null, 2)}</pre>
        </Content>
    {/snippet}
</SkFallback>
