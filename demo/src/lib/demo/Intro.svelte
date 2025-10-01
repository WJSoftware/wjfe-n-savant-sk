<script lang="ts">
    import Content from "$lib/bulma/Content.svelte";

</script>
<Content role="tabpanel">
    <h3>Introduction</h3>
    <p>
        We're inside the <code>&lt;Route path="/"&gt;</code> component now, which in turn is inside a
        nested <code>&lt;Router&gt;</code> component. This nested <code>&lt;Router&gt;</code> component is
        inheriting the base path from the parent router, set to <code>/start</code>.
    </p>
    <p>
        Let's do the "path math":  The parent router matched the URL path <code>/start</code> to the route
        with path <code>/start/*</code> (the <code>/*</code> is a catch-all "rest" parameter), and the nested router 
        matched the remaining URL path <code>(nothing)</code> to the route with path <code>/</code>.
    </p>
    <p>
        <code>@wjfe/n-savant</code>'s matching algorithm normalizes paths before comparing.  We're seeing two 
        normalizations:
    </p>
    <ol>
        <li>
            Empty paths are normalized to <code>/</code>.
        </li>
        <li>
            Trailing slashes are removed.
        </li>
    </ol>
    <p>
        Taking into account these normalizations, the nested router is matching the empty path to the route with path
        <code>/</code>.
    </p>
    <p>
        It sounds complex, but it's only natural.  Browsers actually do this.  <code>window.location.url.pathname</code> 
        returns <code>/</code> when URL's are just the origin (e.g. <code>https://example.com</code>), and when one 
        types in a URL with a trailing slash (e.g. <code>https://example.com/some/path/</code>), the browser removes the trailing 
        slash.  <code>@wjfe/n-savant</code> is merely following the browser's lead.
    </p>
</Content>