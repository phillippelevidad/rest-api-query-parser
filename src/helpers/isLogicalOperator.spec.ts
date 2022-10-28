import { describe, expect, it } from "@jest/globals";
import { LOGICAL_AND, LOGICAL_OR, OPERATORS } from "../models/operators";
import { isLogicalOperator } from "./isLogicalOperator";

describe("isLogicalOperator", () => {
  it("should return `true` for `and` | `or`", () => {
    expect(isLogicalOperator(LOGICAL_AND)).toBe(true);
    expect(isLogicalOperator(LOGICAL_OR)).toBe(true);
  });

  it("should return `false` for every other operator", () => {
    const allOperators = [...OPERATORS];
    const logicalOperators = [LOGICAL_AND, LOGICAL_OR];
    const otherOperators = allOperators.filter(
      (operator) => !logicalOperators.includes(operator)
    );
    expect(
      otherOperators.every((operator) => !isLogicalOperator(operator))
    ).toBe(true);
  });
});
