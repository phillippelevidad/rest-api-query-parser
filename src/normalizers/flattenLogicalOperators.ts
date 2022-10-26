import { isLogicalOperator } from "../helpers/isLogicalOperator";
import { FilterTree } from "../models/FilterTree";
import { LogicalNode } from "../models/LogicalNode";

/**
 * Remove operadores lógicos duplicados.
 * Por exemplo, se um operador AND aparece como filho direto de outro AND,
 * eles são achatados para um único AND.
 * @param filter Filtro a ser normalizado.
 * @param parentLogicalOperator Operador lógico do nó pai, se houver.
 */
export function flattenLogicalOperators(
  filter: FilterTree,
  parentLogicalOperator?: string | null
): FilterTree {
  const result: FilterTree = [];
  for (const node of filter) {
    if (isLogicalOperator(node.operator)) {
      const logicalNode = node as LogicalNode;
      const flattened = flattenLogicalOperators(
        logicalNode.conditions,
        logicalNode.operator
      );

      if (parentLogicalOperator === node.operator) result.push(...flattened);
      else {
        result.push({
          operator: node.operator,
          conditions: flattened,
        });
      }
    } else {
      result.push(node);
    }
  }
  return result;
}
