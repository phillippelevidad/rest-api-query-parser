import { LOGICAL_OPERATORS } from "../models/operators";

export function isLogicalOperator(
  operation: string | null | undefined
): boolean {
  return !!operation && LOGICAL_OPERATORS.some((entry) => entry === operation);
}
