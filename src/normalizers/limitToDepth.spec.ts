import { describe, expect, it } from "@jest/globals";
import { limitToDepth } from "./limitToDepth";

describe("limitToDepth", () => {
  it("should NOT limit simple filter", () => {
    const filter = [{ field: "a", operator: "equals", value: 1 }];
    const limited = limitToDepth(filter, 0);

    expect(limited).toEqual(filter);
  });
});
