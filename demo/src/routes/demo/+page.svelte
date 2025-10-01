<script lang="ts">
    import Section from '$lib/bulma/Section.svelte';
    import { location, Route, Router } from '@wjfe/n-savant';
    import { SkFallback } from '@wjfe/n-savant-sk';
    import type { PageProps } from './$types';
    import Message from '$lib/bulma/Message.svelte';
    import Content from '$lib/bulma/Content.svelte';
    import { isColors, isSizes } from '$lib/bulma/common';
    import Button from '$lib/bulma/Button.svelte';
    import Demo from '$lib/demo/Demo.svelte';
    import { page } from '$app/state';
    import { info } from 'sass';

    let { data }: PageProps = $props();

    let isMulti = $derived(page.url.searchParams.has('multi'));

    function enableMultiHashRouting() {
        window.location.href = '?multi=true';
    }

    function enableSingleHashRouting() {
        window.location.href = '/demo';
    }
</script>

<Section>
    {#if isMulti}
        <Demo hash="d1" />
        <Demo hash="d2" />
    {:else}
        <Demo hash={true} />
    {/if}
    <Section>
        <Message isColor={isColors.info}>
            {#snippet header()}
                <h5 class="title is-5">This is {isMulti ? 'Multi' : 'Single'} Hash Routing</h5>
            {/snippet}
            <Content>
                {#if isMulti}
                <p>
                    This is multi-hash routing mode, enabled by the presence of the <code>?multi=true</code>
                    query parameter in the URL.
                </p>
                <p>
                    Each of the two <code>&lt;Demo&gt;</code> components is using a different named path in the hash
                    fragment, so they can coexist peacefully.
                </p>
                <Button isColor={isColors.info} onclick={enableSingleHashRouting}>
                    Enable Single Hash Routing Mode
                </Button>
                {:else}
                <p>
                    This surely is nice, but if we wanted to have more <code>Tabs</code> components with different
                    routes displayed at the same time, we cannot <em>in single hash routing mode</em>.
                </p>
                <p>
                    The good news is that <code>@wjfe/n-savant</code> supports <strong>multi-hash routing</strong>,
                    which allows multiple routers to coexist, each using a different named path in the hash fragment.
                </p>
                <Button isColor={isColors.info} onclick={enableMultiHashRouting}>
                    Enable Multi-Hash Routing
                </Button>
                {/if}
            </Content>
        </Message>
    </Section>
</Section>
