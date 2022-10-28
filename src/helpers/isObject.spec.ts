import { expect } from "chai";
import { isObject } from "./isObject";

describe("isObject", () => {
  it("should return true for objects", () => {
    expect(isObject({})).to.be.true;
    expect(isObject({ a: 1 })).to.be.true;
    expect(isObject({ a: 1, b: 2 })).to.be.true;
  });

  it("should return false for non-objects", () => {
    expect(isObject(null)).to.be.false;
    expect(isObject(undefined)).to.be.false;
    expect(isObject(1)).to.be.false;
    expect(isObject("some-string")).to.be.false;
    expect(isObject(true)).to.be.false;
    expect(isObject(false)).to.be.false;
    expect(isObject([])).to.be.false;
    expect(isObject([1])).to.be.false;
    expect(isObject([1, 2])).to.be.false;
    expect(isObject(() => null)).to.be.false;
  });
});
