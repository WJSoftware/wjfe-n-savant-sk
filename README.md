# @wjfe/n-savant-sk

> Hash router for Sveltekit projects

This is an extension package of the [@wjfe/n-savant](https://github.com/WJSoftware/wjfe-n-savant) SPA router, and enables the use of the router in hash mode in Sveltekit projects.

## Why Would I Need This?

Sveltekit has an excellent file-based router.  You should always stick to the built-in router for routing your application.  However, as with every other router in existence, you can only do path routing or hash routing, but not both.

The `@wjfe/n-savant` router was born to break this barrier:  This SPA router can do path and hash routing simultaneously.  However, this is a router for SPA's and PWA's that render on the client.  It was not designed for SSR scenarios.  After all, Sveltekit has routing capabilities included.

But what if you wanted to do hash routing on top of Sveltekit's path routing?  You can, with this router extension.

### Useful Scenarios

1. You could show a complex dialog box that is driven by hash routing.
2. You could mount a micro-frontend that routes with a path in the hash.

## Quickstart

1. Install the package
    ```bash
    npm install @wjfe/n-savant-sk # This also installs the @wjfe/n-savant main package
    ```
2. Initialize the library.  Ideally, in the root `+layout.svelte` component:
    ```svelte
    <script lang="ts">
        import { init } from "@wjfe/n-savant-sk";

        init(/* options */);
    </script>
    ```
3. Add routers, routes and links for hash navigation as you please.

> **⚡ Attention!**
> 
> Early testing has revealed what may or may not be a bug in Svelte or Sveltekit.  The situation:  Just importing `init` from `@wjfe/n-savant-sk` triggers error `rune_outside_svelte` on the `trace.svelte.js` file in the `@wjfe/n-savant` package.  To overcome this, just add `{ ssr: { noExternal: ["@wjfe/n-savant", "@wjfe/n-savant-sk"] }}` to Vite's configuration.
>
> Hopefully, I'll be able to figure more about this problem in the coming weeks.

## Limitations

1. Path routing is disallowed.

---

Generally speaking, you need to understand the `@wjfe/n-savant` router, so have handy its [online documentation](https://wjfe-n-savant.hashnode.space/).
