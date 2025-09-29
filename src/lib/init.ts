import { initCore } from "@wjfe/n-savant/core";
import { SkLocation } from "./SkLocation.js";
import type { SkInitOptions } from "./types.js";
import { browser } from "$app/environment";

let cleanupFn: (() => void) | undefined = undefined;

export function init(options?: SkInitOptions) {
    if (!browser) {
        cleanupFn?.();
    }
    cleanupFn = initCore(new SkLocation(), {
        ...options,
        implicitMode: 'hash',
        disallowPathRouting: true,
    });
    return cleanupFn;
}
