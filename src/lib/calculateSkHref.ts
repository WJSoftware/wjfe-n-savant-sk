import { calculateHref } from "@wjfe/n-savant/core";
import type { CalculateSkHrefOptions } from "./types.js";

/**
 * Helper function that combines multiple HREF's into a single HREF using `@wjfe/n-savant`'s `calculateHref` function 
 * for the path routing universe.
 * 
 * #### Why?
 * 
 * To assist in the calculation of HREF's for hyperlinks used by Sveltekit's `<a>` tags so they play nicely with 
 * `@wjfe/n-savant`'s routing universes.
 * 
 * @example
 * ```ts
 * import { calculateSkHref } from '@wjfe/n-savant-sk';
 * 
 * // The demo project in the /demo folder uses the query string to switch between
 * // single and multi-hash routing.  If (Sveltekit's) path routing doesn't 
 * // preserve the query string, errors about mismatched routing universes will 
 * // occur.
 * const href = $derived(calculateSkHref({ preserveQuery: true }, '/demo'));
 * ```
 * 
 * @example
 * ```ts
 * import { calculateSkHref } from '@wjfe/n-savant-sk';
 * 
 * // This one preserves the hash fragment to ensure any hash routing universes
 * // remain intact.
 * const href = $derived(calculateSkHref({ preserveHash: true }, '/abc'));
 * ```
 * 
 * #### Tips
 *
 * 1. Try to always use reactively in `$derived`, `$effect` or templates, since it reads reactive data.
 * 2. If a new hash fragment is desired, simply add it to one of the given HREF's.
 * 3. If you want to calculate an HREF for a hash routing universe, use `@wjfe/n-savant`'s `calculateHref` function.
 * 4. If you don't need to join HREF's or preserve query or hash, you most likely don't need this or the
 * base `calculateHref` function, and can simply use the HREF you already have.
 *
 * @param options Desired options that control how the resultant HREF is calculated.
 * @param href The HREF's used to calculate the final HREF for the desired routing universe.
 * @returns The calculated HREF.
 */
export function calculateSkHref(options: CalculateSkHrefOptions, ...hrefs: string[]): string {
    return calculateHref({ ...options, hash: false }, ...hrefs);
}
