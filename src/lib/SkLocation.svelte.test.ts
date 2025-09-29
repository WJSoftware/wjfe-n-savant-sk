import { describe, test, expect, beforeEach, afterEach, vi, beforeAll, afterAll } from "vitest";
import { SkLocation } from "./SkLocation.js";
import { calculateHref, initCore, preserveQueryInUrl } from "@wjfe/n-savant/core";
import { goto } from "$app/navigation";

let location: SkLocation;

const hoistedVars = vi.hoisted(() => ({
    gotoMock: vi.fn(),
}));

vi.mock(import("$app/navigation"), async (importActual) => {
    return {
        ...await importActual(),
        goto: hoistedVars.gotoMock,
    };
});

// @ts-expect-error
vi.mock(import("@wjfe/n-savant/core"), async (importActual) => {
    const m = await importActual();
    return {
        ...m,
        calculateHref: vi.fn(m.calculateHref),
        preserveQueryInUrl: vi.fn(),
    };
});

describe("SkLocation", () => {
    let cleanup: () => void;
    beforeEach(() => {
        location = new SkLocation();
        cleanup = initCore(location, { implicitMode: 'hash' });
        vi.resetAllMocks();
    });

    afterEach(() => {
        cleanup();
        vi.resetAllMocks();
    });

    describe("skGoTo", () => {
        test("Should call goto with the correct path.", () => {
            location.skGoTo("/test");
            expect(goto).toHaveBeenCalledWith("/test", undefined);
        });
        test.each([
            {
                preserveQuery: true,
                text: 'call',
            },
            {
                preserveQuery: false,
                text: 'not call',
            },
        ])("Should $text preserveQueryInUrl if preserveQuery is $preserveQuery .", ({ preserveQuery }) => {
            location.skGoTo("/test", { preserveQuery });
            if (preserveQuery) {
                expect(preserveQueryInUrl).toHaveBeenCalledWith("/test", preserveQuery);
            } else {
                expect(preserveQueryInUrl).not.toHaveBeenCalled();
            }
        });
        test("Should call goto with the correct path after preserving the query string.", () => {
            vi.mocked(preserveQueryInUrl).mockReturnValue("/test?a=b");
            const options = { preserveQuery: true };
            location.skGoTo("/test", options);
            expect(goto).toHaveBeenCalledWith("/test?a=b", options);
        });
        test("Should forward all of Sveltekit's goto() options to the goto() function.", () => {
            const options = {
                replaceState: true,
                noScroll: true,
                keepFocus: true,
                state: { path: undefined, hash: { single: { test: 1 } } },
                invalidateAll: true,
                invalidate: 'abc',
            };
            location.skGoTo("/test", options);
            expect(goto).toHaveBeenCalledOnce();
            expect(hoistedVars.gotoMock.mock.lastCall![1]).toHaveProperty("replaceState", options.replaceState);
            expect(hoistedVars.gotoMock.mock.lastCall![1]).toHaveProperty("noScroll", options.noScroll);
            expect(hoistedVars.gotoMock.mock.lastCall![1]).toHaveProperty("keepFocus", options.keepFocus);
            expect(hoistedVars.gotoMock.mock.lastCall![1]).toHaveProperty("state", options.state);
            expect(hoistedVars.gotoMock.mock.lastCall![1]).toHaveProperty("invalidateAll", options.invalidateAll);
            expect(hoistedVars.gotoMock.mock.lastCall![1]).toHaveProperty("invalidate", options.invalidate);
        });
    });
});

[
    {
        hashMode: 'single' as const,
        desc: 'SHR',
        hash: true as const,
    },
    {
        hashMode: 'multi' as const,
        desc: 'MHR',
        hash: 'p1',
    },
].forEach((ru) => {
    describe('SkLocation', () => {
        describe(`skNavigate - ${ru.desc}`, () => {
            let cleanup: () => void;

            beforeAll(() => {
                location = new SkLocation();
                cleanup = initCore(location, { implicitMode: 'hash', hashMode: ru.hashMode });
            });

            afterAll(() => {
                cleanup();
            });

            afterEach(() => {
                vi.resetAllMocks();
            });


            test("Should call goto with the correct path and state.", () => {
                const tc = ({
                    single: {
                        inputUrl: '/test',
                        state: 123,
                        expectedHash: '#/test',
                        expectedState: { path: {}, hash: { single: 123 } },
                    },
                    multi: {
                        inputUrl: '/test',
                        state: 'abc',
                        expectedHash: '#p1=/test',
                        expectedState: { path: {}, hash: { [`${ru.hash}`]: 'abc' } },
                    },
                })[ru.hashMode];
                location.skNavigate(tc.inputUrl, { hash: ru.hash, state: tc.state });
                expect(goto).toHaveBeenCalledWith(tc.expectedHash, { hash: ru.hash, state: tc.expectedState });
            });
            test.each([
                {
                    text: 'call',
                    text2: 'not an empty string',
                    href: '/test'
                },
                {
                    text: 'not call',
                    text2: 'an empty string',
                    href: ''
                },
            ])("Should $text calculateHref whenever the href is $text2 .", ({ href }) => {
                location.skNavigate(href, { hash: ru.hash });
                if (href) {
                    expect(calculateHref).toHaveBeenCalledWith(expect.any(Object), href);
                } else {
                    expect(preserveQueryInUrl).not.toHaveBeenCalled();
                }
            });
            test("Should call goto with the correct path and state after preserving the query string.", () => {
                location.url.search = "?a=b";
                const state = { some: 'value' };
                const expectedState = {
                    single: { path: {}, hash: { single: state } },
                    multi: { path: {}, hash: { [`${ru.hash}`]: state } },
                }[ru.hashMode];
                const expectedHref = {
                    single: "?a=b#/test",
                    multi: "?a=b#p1=/test",
                }[ru.hashMode];
                const options = { hash: ru.hash, preserveQuery: true, state };
                location.skNavigate("/test", options);
                expect(goto).toHaveBeenCalledWith(expectedHref, expect.objectContaining({ state: expectedState }));
            });
            test("Should forward all of Sveltekit's goto() options to the goto() function.", () => {
                const options = {
                    hash: ru.hash,
                    replaceState: true,
                    noScroll: true,
                    keepFocus: true,
                    state: { test: 1 },
                    invalidateAll: true,
                    invalidate: 'abc',
                };
                const expectedState = {
                    single: { path: {}, hash: { single: { test: 1 } } },
                    multi: { path: {}, hash: { [`${ru.hash}`]: { test: 1 } } },
                }[ru.hashMode];
                location.skNavigate("/test", options);
                expect(goto).toHaveBeenCalledOnce();
                expect(hoistedVars.gotoMock.mock.lastCall![1]).toHaveProperty("replaceState", options.replaceState);
                expect(hoistedVars.gotoMock.mock.lastCall![1]).toHaveProperty("noScroll", options.noScroll);
                expect(hoistedVars.gotoMock.mock.lastCall![1]).toHaveProperty("keepFocus", options.keepFocus);
                expect(hoistedVars.gotoMock.mock.lastCall![1]).toHaveProperty("state", expectedState);
                expect(hoistedVars.gotoMock.mock.lastCall![1]).toHaveProperty("invalidateAll", options.invalidateAll);
                expect(hoistedVars.gotoMock.mock.lastCall![1]).toHaveProperty("invalidate", options.invalidate);
            });
        });
    });
});
