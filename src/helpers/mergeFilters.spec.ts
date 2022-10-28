import { expect } from "chai";
import { LOGICAL_AND } from "../models/operators";
import { mergeFilters } from "./mergeFilters";

describe("mergeFilters", () => {
  it("should merge simple filters", () => {
    const filter1 = [{ field: "a", operator: "equals", value: 1 }];
    const filter2 = [{ field: "b", operator: "equals", value: 2 }];

    const meged = mergeFilters(filter1, filter2);

    expect(meged).to.deep.equal([
      {
        operator: LOGICAL_AND,
        conditions: [
          { field: "a", operator: "equals", value: 1 },
          { field: "b", operator: "equals", value: 2 },
        ],
      },
    ]);
  });

  it("should merge logical filter with simple filter", () => {
    const filter1 = [
      {
        operator: LOGICAL_AND,
        conditions: [
          { field: "a", operator: "equals", value: 1 },
          { field: "b", operator: "equals", value: 2 },
        ],
      },
    ];
    const filter2 = [{ field: "c", operator: "equals", value: 3 }];

    const meged = mergeFilters(filter1, filter2);

    expect(meged).to.deep.equal([
      {
        operator: LOGICAL_AND,
        conditions: [
          { field: "a", operator: "equals", value: 1 },
          { field: "b", operator: "equals", value: 2 },
          { field: "c", operator: "equals", value: 3 },
        ],
      },
    ]);
  });

  it("should merge simple filter with logical filter", () => {
    const filter1 = [{ field: "c", operator: "equals", value: 3 }];
    const filter2 = [
      {
        operator: LOGICAL_AND,
        conditions: [
          { field: "a", operator: "equals", value: 1 },
          { field: "b", operator: "equals", value: 2 },
        ],
      },
    ];

    const meged = mergeFilters(filter1, filter2);

    expect(meged).to.deep.equal([
      {
        operator: LOGICAL_AND,
        conditions: [
          { field: "c", operator: "equals", value: 3 },
          { field: "a", operator: "equals", value: 1 },
          { field: "b", operator: "equals", value: 2 },
        ],
      },
    ]);
  });
});
