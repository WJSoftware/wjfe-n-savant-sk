<script lang="ts">
    import { isColors } from "$lib/bulma/common";
    import Content from "$lib/bulma/Content.svelte";
    import Notification from "$lib/bulma/Notification.svelte";

</script>
<Content role="tabpanel">
    <h3>Structure of This Content</h3>
    <p>
        What you're seeing is a Bulma-styled (<a href="https://bulma.io" target="_blank" rel="noopener">bulma.io</a>)
        <code>Tabs</code> component, with some interleaved routing components from <code>@wjfe/n-savant</code>.  The
        <code>Tabs</code> component is inside a <code>&lt;Router&gt;</code> component, which has a base path of 
        <code>/start</code>.
    </p>
    <p>
        The tabs themselves are links, implemented with <code>&lt;Link&gt;</code> components.  The links are inside a
        <code>&lt;LinkContext prependBasePath&gt;</code> component, which automatically prepends the base path of the
        enclosing router to each link's <code>href</code> attribute.  This means that the first tab's link is to
        <code>/start/</code> (which is the same as <code>/start</code>), and the second tab's link is to
        <code>/start/struct</code>.
    </p>
    <p>
        Each tab's content is inside a <code>&lt;Route&gt;</code> component.  The first tab's content is inside the
        route with path <code>/</code>, and the second tab's content is inside the route with path <code>/struct</code>.
    </p>
    <h4>The "Active" Look on Tabs</h4>
    <p>
        The "active" look on the tabs is achieved by using <code>@wjfe/n-savant</code>'s <code>activeBehavior()</code>
        attachment factory to add the Bulma-specific <code>is-active</code> class to each tab's list item element.
    </p>
    <Notification isColor={isColors.danger}>
        <h4>Why not use the <code>&lt;Link&gt;</code> component's <code>activeFor</code> + <code>activeState</code> properties?</h4>
        <p>
            In <strong>Bulma</strong>, the "active" look on the <code>Tabs</code> component is applied to the list item
            (<code>&lt;li&gt;</code>) that contains the link, not to the link (<code>&lt;a&gt;</code>) itself.  The 
            <code>&lt;Link&gt;</code> component's "active" feature applies the "active" look to the link, which is not 
            what we want.
        </p>
    </Notification>
</Content>