/**
 * Opções de normalização de filtros.
 */
export interface NormalizeInputFilterOptions {
  /**
   * Lista de campos que serão aceitos, isto é,
   * mantidos no filtro. Tem prioridade sobre os campos
   * ignorados.
   */
  acceptedFields?: string[];
  /**
   * Lista de campos que serão ignorados, isto é,
   * removidos do filtro. Só funciona se não especificar
   * campos aceitos.
   */
  ignoredFields?: string[];
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

export function normalizeOptions(
  options?: NormalizeInputFilterOptions
): NormalizeInputFilterOptions {
  return {
    acceptedFields: [],
    ignoredFields: [],
    maxDepth: DEFAULT_MAX_DEPTH,
    fieldValueMaxDepth: DEFAULT_FIELD_VALUE_MAX_DEPTH,
    ...options,
  };
}
