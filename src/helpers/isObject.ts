export function isObject(value: unknown): boolean {
  const type = typeof value;
  return value !== null && type === "object" && !Array.isArray(value);
}
