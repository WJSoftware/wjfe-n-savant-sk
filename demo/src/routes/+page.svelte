<script lang="ts">
    import { location, Route } from '@wjfe/n-savant';
    import { page } from '$app/state';

    $inspect(page.url);
</script>

<h1>@wjfe/n-savant-sk</h1>
<Route key="home" path="/">
    <p>This is the <strong>home</strong> page.</p>
    <p>Current location: {location.url.href}</p>
    <p>Current page: {page.url.hash}</p>
</Route>
<Route key="about" path="/about">
    <p>This is the <strong>about</strong> page.</p>
    <p>Current location: {location.url.href}</p>
    <p>Current page: {page.url.hash}</p>
</Route>
