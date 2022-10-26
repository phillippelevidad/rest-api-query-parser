import { LogicalOrFilterNode } from "./LogicalOrFilterNode";

/**
 * Árvore de filtros.
 * @example
 * [
 *   {
 *     operator: "and",
 *     conditions: [
 *       {
 *         operator: "or",
 *         conditions: [
 *           {
 *             operator: "equals",
 *             field: "name",
 *             value: "John",
 *           },
 *           {
 *             operator: "equals",
 *             field: "name",
 *             value: "Jane",
 *           },
 *         ],
 *       },
 *       {
 *         operator: "greaterThanOrEquals",
 *         field: "age",
 *         value: 18,
 *       }
 *     ],
 *   }
 * ]
 */
export type FilterTree = Array<LogicalOrFilterNode>;
