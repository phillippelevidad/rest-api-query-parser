import { isLogicalOperator } from "../helpers/isLogicalOperator";
import { FilterTree } from "../models/FilterTree";
import { LogicalNode } from "../models/LogicalNode";

/**
 * Limita a profundidade de um filtro.
 * Os operadores que aumentam a profundiade de um filtro são os lógicos: AND e OR.
 * @param filter Filtro a ser limitado.
 * @param maxDepth Profundidade máxima.
 * @param depth Profundidade atual, começando em 1.
 * @returns O filtro limitado à profundade informada.
 */
export function limitToDepth(filter: FilterTree, maxDepth: number, depth = 1) {
  if (depth > maxDepth) return [];

  const result: FilterTree = [];

  for (const node of filter) {
    if (isLogicalOperator(node.operator)) {
      const logicalNode = node as LogicalNode;

      const limited = limitToDepth(logicalNode.conditions, maxDepth, depth + 1);
      if (!limited.length) continue;

      result.push({
        operator: node.operator,
        conditions: limited,
      });
    } else result.push(node);
  }

  return result;
}
