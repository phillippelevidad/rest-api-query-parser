import { Concrete } from "../helpers/Concrete";

/**
 * Opções comuns de filtros.
 */
export interface FilterOptions {
  /**
   * Lista de campos que serão aceitos, isto é,
   * mantidos no filtro. Tem prioridade sobre os campos
   * ignorados.
   *
   * Os campos serão avaliados a partir do nome já remapeado.
   * @see remapFieldNames
   */
  acceptedFields?: string[];
  /**
   * Lista de campos que serão ignorados, isto é,
   * removidos do filtro. Só funciona se não especificar
   * campos aceitos.
   *
   * Os campos serão avaliados a partir do nome já remapeado.
   * @see remapFieldNames
   */
  ignoredFields?: string[];
  /**
   * Dicionário de campos a serem remapeados.
   * Cada entrada especifica o nome esperado como input X o nome real do campo.
   * @example { "name": "firstName" }
   */
  remapFieldNames?: Record<string, string>;
}

/**
 * Retorna as opções de filtro com valores padrão para as opções
 * que não foram especificadas.
 * @param options Opções de filtro.
 * @returns Opções de filtro com valores padrão para as opções
 * que não foram especificadas.
 */
export function getOptionsOrDefault(
  options?: FilterOptions
): Concrete<FilterOptions> {
  return {
    acceptedFields: [],
    ignoredFields: [],
    remapFieldNames: {},
    ...options,
  };
}

/**
 * Indica se um campo deve ser descartado, de acordo com as opções de filtro.
 * @param remappedFieldName Nome do campo já remapeado.
 * @param options Opções de filtro.
 * @returns `true` se o campo deve ser descartado, `false` caso contrário.
 */
export function shouldDiscardField(
  remappedFieldName: string,
  options: Concrete<FilterOptions>
): boolean {
  const { acceptedFields, ignoredFields } = options;
  if (acceptedFields.length && !acceptedFields.includes(remappedFieldName))
    return true;
  if (ignoredFields.length && ignoredFields.includes(remappedFieldName))
    return true;
  return false;
}
