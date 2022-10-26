import { LogicalOrFilterNode } from "./LogicalOrFilterNode";

/**
 * Nó que especifica uma combinação lógica (AND ou OR) de filtros.
 * @example
 * {
 *   operator: "and",
 *   conditions: [{...}, {...}]
 * }
 */
export type LogicalNode = {
  operator: string;
  conditions: LogicalOrFilterNode[];
};
