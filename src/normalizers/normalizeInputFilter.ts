import { isLogicalOperator } from "../helpers/isLogicalOperator";
import { isObject } from "../helpers/isObject";
import { FilterTree } from "../models/FilterTree";
import { FilterNode } from "../models/FilterNode";
import { LogicalNode } from "../models/LogicalNode";
import { LogicalOrFilterNode } from "../models/LogicalOrFilterNode";
import {
  DEFAULT_LOGICAL_OPERATOR,
  DEFAULT_FILTER_OPERATOR,
  OPERATORS,
  OPERATOR_SYNONYMS,
} from "../models/operators";
import { flattenLogicalOperators } from "./flattenLogicalOperators";
import { limitToDepth } from "./limitToDepth";
import { normalizeFilterValue } from "./normalizeFilterValue";
import { NormalizeInputFilterOptions } from "./NormalizeInputFilterOptions";

type KeyValuePair = {
  key: string;
  value: unknown;
};

const DEFAULT_MAX_DEPTH = 3;
const DEFAULT_FIELD_VALUE_MAX_DEPTH = 3;

/**
 * Normaliza um objeto de filtro para um formato intermediário válido e bem conhecido,
 * que deverá ser posteriormente convertido para um formato específico de banco de dados.
 * @param input Objeto de filtro, como `{ name: "John", age: { gt: 18 } }`
 * @param options Opções de normalização.
 * @returns Um objeto de filtro normalizado, como `[{ field: "name", operator: "equals", value: "John" }, { field: "age", operator: "greaterThan", value: 18 }]`
 * @example
 * normalizeInputFilter({ name: "John" });
 */
export function normalizeInputFilter(
  input: unknown,
  options?: NormalizeInputFilterOptions
): FilterTree {
  options = {
    acceptedFields: [],
    ignoredFields: [],
    maxDepth: DEFAULT_MAX_DEPTH,
    fieldValueMaxDepth: DEFAULT_FIELD_VALUE_MAX_DEPTH,
    ...options,
  };
  const filter = normalizeInputFilterInternal(input, options);
  const flattened = flattenLogicalOperators(filter);
  return limitToDepth(flattened, options.maxDepth!);
}

function normalizeInputFilterInternal(
  input: unknown,
  options: NormalizeInputFilterOptions
): FilterTree {
  if (!input || !isObject(input)) return [];

  const inputObject = input as Record<string, unknown>;
  const nodes = Object.entries(inputObject)
    .map(([key, value]) => normalizeNode({ key, value }, options!))
    .filter((node) => node !== null) as LogicalOrFilterNode[];

  if (!nodes.length) return [];
  if (nodes.length === 1) return nodes;
  return [
    {
      operator: DEFAULT_LOGICAL_OPERATOR,
      conditions: nodes,
    },
  ];
}

function normalizeNode(
  input: KeyValuePair,
  options: NormalizeInputFilterOptions
): LogicalOrFilterNode | null {
  const logicalNode = normalizeLogicalNode(input, options);
  if (logicalNode) return logicalNode;

  const filterNodes = normalizeFilterNode(input, options);
  if (filterNodes.length) {
    if (filterNodes.length === 1) return filterNodes[0];
    return {
      operator: DEFAULT_LOGICAL_OPERATOR,
      conditions: filterNodes,
    };
  }

  return null;
}

function normalizeLogicalNode(
  input: KeyValuePair,
  options: NormalizeInputFilterOptions
): LogicalNode | FilterNode | null {
  const operator = resolveOperator(input.key);
  if (!isLogicalOperator(operator)) return null;
  if (!isObject(input.value)) return null;

  const conditions = Object.entries(input.value as Record<string, unknown>)
    .map((entry) => {
      const input = { key: entry[0], value: entry[1] };
      return normalizeNode(input, options);
    })
    .filter((condition) => condition !== null) as LogicalOrFilterNode[];

  if (!conditions.length) return null;
  if (conditions.length === 1) return conditions[0] as FilterNode;
  return {
    operator: operator!,
    conditions,
  };
}

function normalizeFilterNode(
  input: KeyValuePair,
  options: NormalizeInputFilterOptions
): FilterNode[] {
  const field = input.key;
  if (shouldDiscardField(field, options)) return [];

  // Transforma um valor simples, como "John", em um objeto.
  const valueToHandle = isObject(input.value)
    ? input.value
    : { [DEFAULT_FILTER_OPERATOR]: input.value };

  // O valor do filtro é um objeto, como { gt: 0, lt: 100 }
  const objectValue = valueToHandle as Record<string, unknown>;
  const entries = Object.entries(objectValue)
    .map(([key, value]) => {
      const operator = resolveOperator(key);
      if (operator === null) return null;

      const filterValue = normalizeFilterValue(
        value,
        options.fieldValueMaxDepth!
      );
      if (filterValue === undefined) return null;

      return {
        field,
        operator,
        value: filterValue,
      };
    })
    .filter((node) => node !== null) as FilterNode[];
  return entries;
}

function resolveOperator(operator: string): string | null {
  if (OPERATORS.some((entry) => entry === operator)) return operator;
  const match = OPERATOR_SYNONYMS.find((synonyms) =>
    synonyms.some((synonym) => synonym.toLowerCase() === operator.toLowerCase())
  );
  return match ? match[0] : null;
}

function shouldDiscardField(
  field: string,
  options: NormalizeInputFilterOptions
): boolean {
  const { acceptedFields, ignoredFields } = options;
  if (acceptedFields?.length && !acceptedFields.includes(field)) return true;
  if (ignoredFields?.length && ignoredFields.includes(field)) return true;
  return false;
}
