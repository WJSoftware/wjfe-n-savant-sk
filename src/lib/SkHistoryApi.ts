import type { HistoryApi } from "@wjfe/n-savant";
import { goto } from "$app/navigation";
import { page } from "$app/state";
import { isConformantState } from "@wjfe/n-savant/core";
import { browser } from "$app/environment";

function assertValidUrl(url: string | URL | null | undefined): asserts url is string | URL {
    if (url === null || url === undefined) {
        throw new Error("Sveltekit navigation demands a string or URL, and disallows null and undefined values.");
    }
}

export class SkHistoryApi implements HistoryApi {
    constructor() {
        if (browser && !isConformantState(page.state)) {
            // I tried with replaceState() here, throws with error "cannot use before router initializes".
            // So, using goto() with replaceState: true.  This triggers an update on page.url, though.
            goto('', { replaceState: true, state: { path: page.state, hash: {} } });
        }
    }

    get url() {
        return page.url;
    }

    dispose(): void { }

    get length(): number {
        return window.history.length;
    }

    get scrollRestoration(): ScrollRestoration {
        return window.history.scrollRestoration;
    }

    set scrollRestoration(value: ScrollRestoration) {
        window.history.scrollRestoration = value;
    }

    get state() {
        // This IF block ensures proper operation in SSR and unit testing.
        if (!isConformantState(page.state)) {
            return { path: page.state, hash: {} };
        }
        return page.state;
    }

    back(): void {
        window.history.back();
    }

    forward(): void {
        window.history.forward();
    }

    go(delta?: number): void {
        window.history.go(delta);
    }

    pushState(data: any, unused: string, url?: string | URL | null): void {
        assertValidUrl(url);
        goto(url, { state: data, noScroll: true });
    }

    replaceState(data: any, unused: string, url?: string | URL | null): void {
        assertValidUrl(url);
        goto(url, { state: data, replaceState: true, noScroll: true });
    }
}
