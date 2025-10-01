import "@wjfe/n-savant";
import { goto } from "$app/navigation";
import type { Hash, PreserveQuery, InitOptions, State, GoToOptions } from "@wjfe/n-savant";
import type { calculateHref } from "@wjfe/n-savant/core";

/**
 * Options available to the `Location.skGoto` method.
 */
export type SkGotoOptions = Omit<Parameters<typeof goto>[1], 'state'> & Pick<GoToOptions, 'state' | 'preserveQuery'>;

/**
 * Options available to the `Location.skNavigate` method.
 */
export type SkNavigationOptions = Omit<SkGotoOptions, 'state'> & {
    /**
     * The state data to associate with the new URL and hash value.
     */
    state?: App.PageState;
    /**
     * The hash value that determines the routing universe in which navigation will take place.
     */
    hash?: Exclude<Hash, false>;
};

declare module "@wjfe/n-savant" {
    export interface Location {
        /**
         * Navigates to the specified href using SvelteKit's `goto` function.  This function, just like 
         * `@wjfe/n-savant`'s `Location.navigate`, will correctly place the href and state data in the correct places
         * according to the routing universe determined by the `hash` option.
         * 
         * @param href The href to navigate to.
         * @param options Navigation options.
         * 
         * @returns The promise returned by SvelteKit's `goto` function.
         */
        skNavigate(href: string, options?: SkNavigationOptions): Promise<void>;
        /**
         * Navigates to the specified href using SvelteKit's `goto` function.  This function, just like 
         * `@wjfe/n-savant`'s `Location.goTo`, will not make any calculations regarding routing universes.
         * 
         * @param href The href to navigate to.
         * @param options Navigation options.
         * 
         * @returns The promise returned by SvelteKit's `goto` function.
         */
        skGoTo(href: string, options?: SkGotoOptions): Promise<void>;
    }
}

/**
 * Options available to the `init` function.
 */
export type SkInitOptions = Omit<InitOptions, 'implicitMode'>;

export type SkHash = Exclude<Hash, false>;

export type CalculateSkHrefOptions = Omit<Parameters<typeof calculateHref>[0], 'hash'>;
