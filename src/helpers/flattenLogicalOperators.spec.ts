import { expect } from "chai";
import { flattenLogicalOperators } from "./flattenLogicalOperators";

describe("flattenLogicalOperators", () => {
  it("should flatten same operators when direct parent/child", () => {
    const flattened = flattenLogicalOperators([
      {
        operator: "and",
        conditions: [
          {
            operator: "and",
            conditions: [{ field: "a", operator: "equals", value: 1 }],
          },
        ],
      },
    ]);

    expect(flattened).to.deep.equal([
      {
        operator: "and",
        conditions: [{ field: "a", operator: "equals", value: 1 }],
      },
    ]);
  });

  it("should NOT flatten different operators", () => {
    const flattened = flattenLogicalOperators([
      {
        operator: "and",
        conditions: [
          {
            operator: "or",
            conditions: [
              { field: "a", operator: "equals", value: 1 },
              { field: "b", operator: "equals", value: 2 },
            ],
          },
        ],
      },
    ]);

    expect(flattened).to.deep.equal([
      {
        operator: "and",
        conditions: [
          {
            operator: "or",
            conditions: [
              { field: "a", operator: "equals", value: 1 },
              { field: "b", operator: "equals", value: 2 },
            ],
          },
        ],
      },
    ]);
  });
});
