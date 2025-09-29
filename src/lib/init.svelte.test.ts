import { describe, test, expect, vi, afterEach } from "vitest";
import { init } from "./init.js";
import { initCore } from "@wjfe/n-savant/core";
import { SkLocation } from "./SkLocation.js";
import type { SkInitOptions } from "./types.js";

vi.mock(import("@wjfe/n-savant/core"), async (importActual) => {
    return {
        ...(await importActual()),
        initCore: vi.fn(),
    };
});

vi.mock(import("$app/navigation"), async (importActual) => {
    return {
        ...(await importActual()),
        goto: vi.fn(),
    };
});

describe("init", () => {
    afterEach(() => {
        vi.resetAllMocks();
    });
    
    test("Should call initCore with implicit hash mode.", () => {
        init();
        expect(initCore).toHaveBeenCalledWith(expect.any(SkLocation), expect.objectContaining({
            implicitMode: 'hash',
        }));
    });
    test("Should forward options to initCore.", () => {
        const options: SkInitOptions = {
            hashMode: 'multi',
            logger: true,
            trace: {
                routerHierarchy: true,
            }
        };
        init(options);
        expect(initCore).toHaveBeenCalledWith(expect.any(SkLocation), expect.objectContaining({
            implicitMode: 'hash',
            ...options,
        }));
    });
    test("Should return the cleanup function from initCore.", () => {
        const cleanupFn = vi.fn();
        vi.mocked(initCore).mockReturnValueOnce(cleanupFn);
        const r = init();
        expect(r).toBe(cleanupFn);
    });
});
