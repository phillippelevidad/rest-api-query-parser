import { FilterValue } from "./FilterValue";

/**
 * Nó que especifica um filtro por um campo, um operador e um valor.
 * @example
 * {
 *   operator: "equals",
 *   field: "name",
 *   value: "John",
 * }
 */
export type FilterNode = {
  operator: string;
  field: string;
  value: FilterValue;
};
