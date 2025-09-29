import { goto } from "$app/navigation";
import { calculateHref, calculateState, LocationLite, preserveQueryInUrl } from "@wjfe/n-savant/core";
import type { Location } from "@wjfe/n-savant";
import type { SkGotoOptions, SkNavigationOptions } from "./types.js";
import { SkHistoryApi } from "./SkHistoryApi.js";

export class SkLocation extends LocationLite implements Location {
    constructor() {
        super(new SkHistoryApi());
    }
    skGoTo(href: string, options?: SkGotoOptions): Promise<void> {
        if (options?.preserveQuery && href !== '') {
            href = preserveQueryInUrl(href, options.preserveQuery);
        }
        return goto(href, options);
    }
    skNavigate(href: string, options?: SkNavigationOptions): Promise<void> {
        if (href !== '') {
            href = calculateHref({
                hash: options?.hash,
                preserveQuery: options?.preserveQuery,
            }, href);
        }
        return goto(href, {
            ...options,
            state: calculateState(options?.hash, options?.state)
        });
    }
}
