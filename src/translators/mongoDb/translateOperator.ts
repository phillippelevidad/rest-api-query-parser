import {
  FILTER_CONTAINS,
  FILTER_CONTAINS_ANY,
  FILTER_ENDS_WITH,
  FILTER_EQUALS,
  FILTER_GREATER_THAN,
  FILTER_GREATER_THAN_OR_EQUALS,
  FILTER_IN,
  FILTER_LESS_THAN,
  FILTER_LESS_THAN_OR_EQUALS,
  FILTER_NOT_CONTAINS,
  FILTER_NOT_EQUALS,
  FILTER_NOT_IN,
  FILTER_STARTS_WITH,
  LOGICAL_AND,
  LOGICAL_OR,
} from "../../models/operators";

export function translateOperator(operator: string): string | null {
  switch (operator) {
    case LOGICAL_AND:
      return "$and";
    case LOGICAL_OR:
      return "$or";

    case FILTER_EQUALS:
      return "$eq";
    case FILTER_NOT_EQUALS:
      return "$ne";
    case FILTER_IN:
      return "$in";
    case FILTER_NOT_IN:
      return "$nin";

    case FILTER_CONTAINS:
      return "$elemMatch"; // maybe use $all instead?
    case FILTER_CONTAINS_ANY:
      return "$in";
    case FILTER_NOT_CONTAINS:
      return "❌❌❌";
    case FILTER_STARTS_WITH:
      return "❌❌❌";
    case FILTER_ENDS_WITH:
      return "❌❌❌";

    case FILTER_GREATER_THAN:
      return "$gt";
    case FILTER_GREATER_THAN_OR_EQUALS:
      return "$gte";
    case FILTER_LESS_THAN:
      return "$lt";
    case FILTER_LESS_THAN_OR_EQUALS:
      return "$lte";
  }

  return null;
}
