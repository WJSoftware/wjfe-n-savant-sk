import { goto } from "$app/navigation";
import type { Page } from "@sveltejs/kit";
import { describe, test, expect, vi, beforeEach, afterEach, beforeAll, afterAll } from "vitest";
import { SkHistoryApi } from "./SkHistoryApi.js";

const historyMocks = {
    pushState: vi.fn(),
    replaceState: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    go: vi.fn(),
    length: vi.fn(),
    scrollRestoration: vi.fn(),
};

const historyMock: History = {
    pushState: historyMocks.pushState,
    replaceState: historyMocks.replaceState,
    back: historyMocks.back,
    forward: historyMocks.forward,
    go: historyMocks.go,
    get length() {
        return historyMocks.length();
    },
    get scrollRestoration() {
        return historyMocks.scrollRestoration();
    },
    set scrollRestoration(value: ScrollRestoration) {
        historyMocks.scrollRestoration(value);
    },
    get state() {
        return null;
    }
};

vi.mock(import("$app/navigation"), async (importOriginal) => {
    return {
        ...await importOriginal(),
        goto: vi.fn(),
    }
});

const hoistedVars = vi.hoisted(() => ({
    urlMock: vi.fn().mockReturnValue(new URL("http://localhost/")),
    stateMock: vi.fn().mockReturnValue(null)
}));

vi.mock(import("$app/state"), async (importOriginal) => {
    return {
        ...importOriginal,
        page: {
            get url() {
                return hoistedVars.urlMock();
            },
            get state() {
                return hoistedVars.stateMock();
            }
        } as Page
    }
});

describe("SkHistoryApi", () => {

    beforeAll(() => {
        // vi.stubGlobal("window", { history: historyMock });
        vi.stubGlobal("history", historyMock);
    });

    afterAll(() => {
        vi.unstubAllGlobals();
    });

    let historyApi: SkHistoryApi;

    beforeEach(() => {
        historyApi = new SkHistoryApi();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    describe("Properties", () => {
        test("Should get the URL from the $app/state page store.", () => {
            const url = historyApi.url;
            expect(hoistedVars.urlMock).toHaveBeenCalled();
        });

        test("Should get the state from the $app/state page store.", () => {
            const state = historyApi.state;
            expect(hoistedVars.stateMock).toHaveBeenCalled();
        });

        test("Should get the length from window.history.", () => {
            const length = historyApi.length;
            expect(historyMocks.length).toHaveBeenCalled();
        });

        test("Should get the scrollRestoration from window.history.", () => {
            const scrollRestoration = historyApi.scrollRestoration;
            expect(historyMocks.scrollRestoration).toHaveBeenCalled();
        });

        test("Should set the scrollRestoration in window.history.", () => {
            historyApi.scrollRestoration = "manual";
            expect(historyMocks.scrollRestoration).toHaveBeenCalledWith("manual");
        });
    });

    describe("pushState", () => {
        test("Should call goto with the correct arguments for pushState.", () => {
            const state = { foo: "bar" };
            historyApi.pushState(state, '', 'http://localhost/new-page');
            expect(goto).toHaveBeenCalledWith('http://localhost/new-page', { state });
        });

        test.each([
            null,
            undefined
        ])("Should throw if the URL is %s.", (url) => {
            expect(() => historyApi.pushState({}, '', url)).toThrow();
        });
    });
    describe("replaceState", () => {
        test("Should call goto with the correct arguments for replaceState.", () => {
            const state = { foo: "bar" };
            historyApi.replaceState(state, '', 'http://localhost/new-page');
            expect(goto).toHaveBeenCalledWith('http://localhost/new-page', { state, replaceState: true });
        });

        test.each([
            null,
            undefined
        ])("Should throw if the URL is %s.", (url) => {
            expect(() => historyApi.replaceState({}, '', url)).toThrow();
        });
    });
    describe("History Navigation", () => {
        test("Should call history.back().", () => {
            historyApi.back();
            expect(historyMocks.back).toHaveBeenCalledWith();
        });

        test("Should call history.forward().", () => {
            historyApi.forward();
            expect(historyMocks.forward).toHaveBeenCalledWith();
        });

        test("Should call history.go() with no arguments.", () => {
            historyApi.go();
            expect(historyMocks.go).toHaveBeenCalledWith(undefined);
        });

        test("Should call history.go() with a delta.", () => {
            historyApi.go(-2);
            expect(historyMocks.go).toHaveBeenCalledWith(-2);
        });
    });
});
