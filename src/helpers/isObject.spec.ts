import { describe, expect, it } from "@jest/globals";
import { isObject } from "./isObject";

describe("isObject", () => {
  it("should return true for objects", () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ a: 1 })).toBe(true);
    expect(isObject({ a: 1, b: 2 })).toBe(true);
  });

  it("should return false for non-objects", () => {
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject(1)).toBe(false);
    expect(isObject("some-string")).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(false)).toBe(false);
    expect(isObject([])).toBe(false);
    expect(isObject([1])).toBe(false);
    expect(isObject([1, 2])).toBe(false);
    expect(isObject(() => null)).toBe(false);
  });
});
