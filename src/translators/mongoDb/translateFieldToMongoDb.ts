import { Document, Filter } from "mongodb";
import { FilterNode } from "../../models/FilterNode";
import { FilterTree } from "../../models/FilterTree";
import { LogicalNode } from "../../models/LogicalNode";
import { LogicalOrFilterNode } from "../../models/LogicalOrFilterNode";
import { LOGICAL_OPERATORS } from "../../models/operators";
import { flattenLogicalOperators } from "./flattenLogicalOperators";
import { mergeDuplicatedFields } from "./mergeDuplicatedFields";
import { translateOperator } from "./translateOperator";

/**
 * Converte um FilterTree em um objeto que pode ser usado como filtro no MongoDB.
 * @param filter A árvore de filtros a ser convertida.
 * @returns Um objeto que pode ser usado como filtro no MongoDB.
 */
export function translateFieldToMongoDb(filter: FilterTree): Filter<Document> {
  if (filter.length === 0) return {};
  const translated = translateNode(filter[0]) ?? {};
  const merged = mergeDuplicatedFields(translated);
  return merged;
}

function translateNode(node: LogicalOrFilterNode): Filter<Document> | null {
  return LOGICAL_OPERATORS.includes(node.operator)
    ? translateLogicalNode(node as LogicalNode)
    : translateFilterNode(node as FilterNode);
}

function translateLogicalNode(node: LogicalNode): Filter<Document> | null {
  const mongoOperator = translateOperator(node.operator);
  if (mongoOperator === null) return null;
  return {
    [mongoOperator]: node.conditions
      .map(translateNode)
      .filter((entry) => entry !== null) as Filter<Document>[],
  };
}

function translateFilterNode(node: FilterNode): Filter<Document> | null {
  const mongoOperator = translateOperator(node.operator);
  if (mongoOperator === null) return null;
  return {
    [node.field]: {
      [mongoOperator]: node.value,
    },
  };
}
