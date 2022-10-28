// Logical.
export const LOGICAL_AND = "and";
export const LOGICAL_OR = "or";

// General.
export const FILTER_EQUALS = "equals";
export const FILTER_NOT_EQUALS = "notEquals";
export const FILTER_IN = "in";
export const FILTER_NOT_IN = "notIn";

// Strings and arrays.
export const FILTER_CONTAINS = "contains";
export const FILTER_CONTAINS_ANY = "containsAny";
export const FILTER_NOT_CONTAINS = "notContains";
export const FILTER_STARTS_WITH = "startsWith";
export const FILTER_ENDS_WITH = "endsWith";

// Numbers and dates.
export const FILTER_GREATER_THAN = "greaterThan";
export const FILTER_GREATER_THAN_OR_EQUALS = "greaterThanOrEquals";
export const FILTER_LESS_THAN = "lessThan";
export const FILTER_LESS_THAN_OR_EQUALS = "lessThanOrEquals";

// Defaults.
export const DEFAULT_FILTER_OPERATOR = FILTER_EQUALS;
export const DEFAULT_LOGICAL_OPERATOR = LOGICAL_AND;

// -----

export const LOGICAL_OPERATORS = [LOGICAL_AND, LOGICAL_OR];

export const STRING_OPERATORS = [
  FILTER_EQUALS,
  FILTER_NOT_EQUALS,
  FILTER_IN,
  FILTER_NOT_IN,
  FILTER_CONTAINS,
  FILTER_CONTAINS_ANY,
  FILTER_NOT_CONTAINS,
  FILTER_STARTS_WITH,
  FILTER_ENDS_WITH,
];

export const NUMBER_OPERATORS = [
  FILTER_EQUALS,
  FILTER_NOT_EQUALS,
  FILTER_IN,
  FILTER_NOT_IN,
  FILTER_GREATER_THAN,
  FILTER_GREATER_THAN_OR_EQUALS,
  FILTER_LESS_THAN,
  FILTER_LESS_THAN_OR_EQUALS,
];

export const BOOLEAN_OPERATORS = [FILTER_EQUALS, FILTER_NOT_EQUALS];

export const DATE_OPERATORS = [
  FILTER_EQUALS,
  FILTER_NOT_EQUALS,
  FILTER_IN,
  FILTER_NOT_IN,
  FILTER_GREATER_THAN,
  FILTER_GREATER_THAN_OR_EQUALS,
  FILTER_LESS_THAN,
  FILTER_LESS_THAN_OR_EQUALS,
];

export const ARRAY_OPERATORS = [
  FILTER_CONTAINS,
  FILTER_CONTAINS_ANY,
  FILTER_NOT_CONTAINS,
  FILTER_STARTS_WITH,
  FILTER_ENDS_WITH,
];

export const OPERATORS = [
  ...new Set([
    ...LOGICAL_OPERATORS,
    ...STRING_OPERATORS,
    ...NUMBER_OPERATORS,
    ...BOOLEAN_OPERATORS,
    ...DATE_OPERATORS,
    ...ARRAY_OPERATORS,
  ]),
];

export const OPERATOR_SYNONYMS = [
  [LOGICAL_AND, "&&"],
  [LOGICAL_OR, "||"],
  [FILTER_EQUALS, "eq", "==", "==="],
  [FILTER_NOT_EQUALS, "ne", "neq", "!=", "!=="],
  [FILTER_IN, "in"],
  [FILTER_NOT_IN, "nin"],
  [FILTER_CONTAINS, "cn"],
  [FILTER_CONTAINS_ANY, "ca"],
  [FILTER_NOT_CONTAINS, "ncn"],
  [FILTER_STARTS_WITH, "sw"],
  [FILTER_ENDS_WITH, "ew"],
  [FILTER_GREATER_THAN, "gt", ">"],
  [FILTER_GREATER_THAN_OR_EQUALS, "gte", ">="],
  [FILTER_LESS_THAN, "lt", "<"],
  [FILTER_LESS_THAN_OR_EQUALS, "lte", "<="],
];
