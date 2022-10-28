import { describe, expect, it } from "@jest/globals";
import {
  DEFAULT_FILTER_OPERATOR,
  FILTER_EQUALS,
  FILTER_IN,
  FILTER_NOT_EQUALS,
} from "../models/operators";
import { normalizeInputFilter } from "./normalizeInputFilter";

describe("normalizeInputFilter", () => {
  it("should convert simple object to default filter operation", () => {
    const input = { name: "John" };
    const expected = [
      {
        operator: DEFAULT_FILTER_OPERATOR,
        field: "name",
        value: "John",
      },
    ];
    const actual = normalizeInputFilter(input);
    expect(actual).toEqual(expected);
  });

  it("should create an AND operation for a field with two conditions", () => {
    const input = { name: { eq: "John", ne: "Doe" } };
    const expected = [
      {
        operator: "and",
        conditions: [
          {
            operator: FILTER_EQUALS,
            field: "name",
            value: "John",
          },
          {
            operator: FILTER_NOT_EQUALS,
            field: "name",
            value: "Doe",
          },
        ],
      },
    ];
    const actual = normalizeInputFilter(input);
    expect(actual).toEqual(expected);
  });

  it("should allow an array as value for a field filter", () => {
    const input = { name: { in: ["John", "Doe"] } };
    const expected = [
      {
        operator: FILTER_IN,
        field: "name",
        value: ["John", "Doe"],
      },
    ];
    const actual = normalizeInputFilter(input);
    expect(actual).toEqual(expected);
  });

  it("should allow an object as value for a field filter", () => {
    const input = { name: { eq: { name: "John", age: 18 } } };
    const expected = [
      {
        operator: FILTER_EQUALS,
        field: "name",
        value: { name: "John", age: 18 },
      },
    ];
    const actual = normalizeInputFilter(input);
    expect(actual).toEqual(expected);
  });
});
