import { Concrete } from "../helpers/Concrete";
import {
  FilterOptions,
  getOptionsOrDefault as getBaseOptionsOrDefault,
} from "../models/FilterOptions";

/**
 * Opções de normalização de filtros.
 */
export interface NormalizeInputFilterOptions extends FilterOptions {
  /**
   * Profundidade máxima do filtro.
   * O que aumenta a profundidade de um filtro são os operadores lógicos: AND e OR.
   * O valor padrão é 3. Itens mais profundos serão removidos.
   */
  maxDepth?: number;
  /**
   * Profundidade máxima para os valores dos campos.
   * O valor padrão é 3. Valores mais profundos serão removidos.
   */
  fieldValueMaxDepth?: number;
}

const DEFAULT_MAX_DEPTH = 3;
const DEFAULT_FIELD_VALUE_MAX_DEPTH = 3;

export function getOptionsOrDefault(
  options?: NormalizeInputFilterOptions
): Concrete<NormalizeInputFilterOptions> {
  return {
    maxDepth: DEFAULT_MAX_DEPTH,
    fieldValueMaxDepth: DEFAULT_FIELD_VALUE_MAX_DEPTH,
    ...getBaseOptionsOrDefault(options),
  };
}
