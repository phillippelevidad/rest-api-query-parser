import { Document, Filter } from "mongodb";
import { Concrete } from "../../helpers/Concrete";
import { FilterNode } from "../../models/FilterNode";
import { FilterTree } from "../../models/FilterTree";
import { LogicalNode } from "../../models/LogicalNode";
import { LogicalOrFilterNode } from "../../models/LogicalOrFilterNode";
import { LOGICAL_OPERATORS } from "../../models/operators";
import { mergeDuplicatedFields } from "./mergeDuplicatedFields";
import { translateOperator } from "./translateOperator";

export interface TranslateFilterOptions {
  remapFieldNames?: Record<string, string>;
}

export function normalizeFilterOptions(
  options?: TranslateFilterOptions
): Concrete<TranslateFilterOptions> {
  return {
    remapFieldNames: {},
    ...options,
  };
}

/**
 * Converte um FilterTree em um objeto que pode ser usado como filtro no MongoDB.
 * @param filter A árvore de filtros a ser convertida.
 * @returns Um objeto que pode ser usado como filtro no MongoDB.
 */
export function translateFilterToMongoDb(
  filter: FilterTree,
  options?: TranslateFilterOptions
): Filter<Document> {
  if (filter.length === 0) return {};
  const opt = normalizeFilterOptions(options);
  const translated = translateNode(filter[0], opt) ?? {};
  const merged = mergeDuplicatedFields(translated);
  return merged;
}

function translateNode(
  node: LogicalOrFilterNode,
  options: Concrete<TranslateFilterOptions>
): Filter<Document> | null {
  return LOGICAL_OPERATORS.includes(node.operator)
    ? translateLogicalNode(node as LogicalNode, options)
    : translateFilterNode(node as FilterNode, options);
}

function translateLogicalNode(
  node: LogicalNode,
  options: Concrete<TranslateFilterOptions>
): Filter<Document> | null {
  const mongoOperator = translateOperator(node.operator);
  if (mongoOperator === null) return null;
  return {
    [mongoOperator]: node.conditions
      .map((node) => translateNode(node, options))
      .filter((entry) => entry !== null) as Filter<Document>[],
  };
}

function translateFilterNode(
  node: FilterNode,
  options: Concrete<TranslateFilterOptions>
): Filter<Document> | null {
  const mongoOperator = translateOperator(node.operator);
  if (mongoOperator === null) return null;

  const fieldName = options.remapFieldNames[node.field] ?? node.field;

  return {
    [fieldName]: {
      [mongoOperator]: node.value,
    },
  };
}
