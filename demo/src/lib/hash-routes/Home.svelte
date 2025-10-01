<script lang="ts">
    import { isColors, isSizes } from '$lib/bulma/common';
    import Hero from '$lib/bulma/Hero.svelte';
    import Section from '$lib/bulma/Section.svelte';
</script>

<Section>
    <Hero isColor={isColors.info}>
        <p class="title">@wjfe/n-savant-sk</p>
        <p class="subtitle">Hash routing on top of SvelteKit's path routing</p>
    </Hero>
</Section>
<Section>
    <div class="box content">
        <p>
            This is a demonstration of the <strong>@wjfe/n-savant-sk</strong> package, which provides hash routing capabilities on top of SvelteKit's built-in path routing.
        </p>
        <p>
            To start the demonstration, click on the <strong>"Start Demo"</strong> link in the top navbar.
        </p>
    </div>
</Section>
