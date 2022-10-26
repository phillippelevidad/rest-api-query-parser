import { isObject } from "../helpers/isObject";
import { FilterValue } from "../models/FilterValue";

/**
 * Normaliza um valor de filtro para um formato intermediário válido e bem conhecido,
 * que deverá ser posteriormente convertido para um formato específico de banco de dados.
 * @param value Valor a ser normalizado, como "John" ou { gt: 18 }
 * @param maxDepth Profundidade máxima de recursão.
 * @param depth Profundidade atual de recursão, começando em 1.
 * @returns O valor normalizado, como "John" ou { operator: "greaterThan", value: 18 }
 * @example
 * normalizeFilterValue({ name: "John" }, 3);
 */
export function normalizeFilterValue(
  value: unknown,
  maxDepth: number,
  depth = 1
): FilterValue | undefined {
  if (depth > maxDepth) return undefined;

  if (value === undefined) return undefined;
  if (value === null) return null;

  if (typeof value === "string") return value;
  if (typeof value === "number") return value;
  if (typeof value === "boolean") return value;

  if (isObject(value)) {
    return normalizeObjectValue(
      value as Record<string, unknown>,
      maxDepth,
      depth
    );
  }

  if (Array.isArray(value)) {
    return normalizeArrayValue(value as Array<FilterValue>, maxDepth, depth);
  }

  return undefined;
}

function normalizeObjectValue(
  value: Record<string, unknown>,
  maxDepth: number,
  depth: number
): Record<string, unknown> | undefined {
  let hasKeys = false;
  const normalized = Object.keys(value).reduce((normalized, key) => {
    const normalizedValue = normalizeFilterValue(
      value[key],
      maxDepth,
      depth + 1
    );

    if (normalizedValue !== undefined) {
      normalized[key] = normalizedValue;
      hasKeys = true;
    }

    return normalized;
  }, {} as Record<string, unknown>);

  return hasKeys ? normalized : undefined;
}

function normalizeArrayValue(
  value: Array<unknown>,
  maxDepth: number,
  depth: number
): Array<FilterValue> | undefined {
  const normalizedArray = [
    ...new Set(
      value
        .map((item) => normalizeFilterValue(item, maxDepth, depth + 1))
        .filter((item) => item !== undefined)
    ),
  ];

  if (!normalizedArray.length) return undefined;

  const sample = normalizedArray.find((item) => item !== null);
  if (sample === undefined) return undefined;

  if (typeof sample === "string") return normalizedArray as Array<string>;
  if (typeof sample === "number") return normalizedArray as Array<number>;
  if (typeof sample === "boolean") return normalizedArray as Array<boolean>;

  if (isObject(sample))
    return normalizedArray as Array<Record<string, unknown>>;

  return undefined;
}
