/**
 * Valor de um filtro.
 * Por exemplo, quando um campo `name` está sendo filtrado pela string `"John"`,
 * o valor do filtro é `"John"` e é representado por este tipo `FilterValue`.
 */
export type FilterValue =
  | string
  | number
  | boolean
  | Record<string, unknown>
  | Array<FilterValue>
  | null;
