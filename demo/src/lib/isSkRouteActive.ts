import { page } from "$app/state";

export function isSkRouteActive(route: string): boolean {
    return page.url.pathname === route;
}
