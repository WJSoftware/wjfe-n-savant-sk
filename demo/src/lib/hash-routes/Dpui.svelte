<script lang="ts">
    import Card from "$lib/Card.svelte";

</script>
<Card header="Disconnected Pieces of User Interface (DPUI)">
    <div class="content">
        <p>
            Disconnected Pieces of User Interface (DPUI) is a feature of
            <code>@wjfe/n-savant</code> (and inherited by <code>@wjfe/n-savant-sk</code>)
            that allows you to render user interface in different places of the document's 
            HTML markup for a single route match.
        </p>
        <p>
            Have you ever wanted for <code>+layout.svelte</code> components to have the 
            ability to define additional snippets?  Well, DPUI gives you this ability.  The 
            entire contents of a <code>Router</code> are potential places where you can 
            render additional user interface for a given route match.
        </p>
        <p>
            In this demo application, the <code>+layout.svelte</code> component contains
            the top navigation bar.  When the user navigates to the home route (i.e. when
            the hash fragment is empty or <code>#/</code>), additional links are added
            to the navigation bar.  These links were not present when the application was
            pre-rendered by SvelteKit because hash fragments are not sent to the server.
            Instead, they were added by <code>@wjfe/n-savant-sk</code> as part of the
            <code>home</code> route.
        </p>
    </div>
</Card>
