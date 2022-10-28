import { FilterTree } from "../models/FilterTree";
import { LogicalOrFilterNode } from "../models/LogicalOrFilterNode";
import { LOGICAL_AND } from "../models/operators";

/**
 * Mescla dois filtros em um único filtro.
 * @param filter1 Primeiro filtro.
 * @param filter2 Segundo filtro.
 * @returns Um filtro que representa a união dos dois filtros.
 */
export function mergeFilters(
  filter1: FilterTree,
  filter2: FilterTree
): FilterTree {
  if (!filter2.length) return filter1;
  if (!filter1.length) return filter2;

  return [
    {
      operator: LOGICAL_AND,
      conditions: [toSingleNode(filter1), toSingleNode(filter2)],
    },
  ];
}

function toSingleNode(filter: FilterTree): LogicalOrFilterNode {
  if (filter.length === 1) return filter[0];
  return {
    operator: LOGICAL_AND,
    conditions: filter,
  };
}
