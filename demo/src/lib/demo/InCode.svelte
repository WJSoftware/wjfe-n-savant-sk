<script lang="ts">
    import Content from "$lib/bulma/Content.svelte";

</script>

<Content role="tabpanel">
    <h3>Structure In Code</h3>
    <pre><code>&lt;Router basePath="/start"&gt;
    {'{'}#snippet children(state, rs){'}'}
        &lt;Tabs&gt;
            &lt;LinkContext prependBasePath&gt;
                &lt;li class={'{'}{'{'} 'is-active': rs['intro']?.match {'}'}{'}'}&gt;&lt;Link href="/"&gt;Intro&lt;/Link&gt;&lt;/li&gt;
                &lt;li class={'{'}{'{'} 'is-active': rs['struct']?.match {'}'}{'}'}&gt;&lt;Link href="/struct"&gt;Structure&lt;/Link&gt;&lt;/li&gt;
                &lt;li class={'{'}{'{'} 'is-active': rs['in-code']?.match {'}'}{'}'}&gt;&lt;Link href="/in-code"&gt;In Code&lt;/Link&gt;&lt;/li&gt;
            &lt;/LinkContext&gt;
        &lt;/Tabs&gt;
        &lt;Route key="intro" path="/"&gt;
            &lt;Intro /&gt;
        &lt;/Route&gt;
        &lt;Route key="struct" path="/struct"&gt;
            &lt;Struct /&gt;
        &lt;/Route&gt;
        &lt;Route key="in-code" path="/in-code"&gt;
            &lt;InCode /&gt;
        &lt;/Route&gt;
    {'{/'}snippet{'}'}
&lt;/Router&gt;</code></pre>
</Content>