import { Document, Filter } from "mongodb";

export function mergeDuplicatedFields(
  filter: Filter<Document>
): Filter<Document> {
  if (Array.isArray(filter)) return mergeArray(filter);
  return mergeFields(filter);
}

function mergeArray(filter: Filter<Document>[]): Filter<Document>[] {
  const addedKeys: string[] = [];
  const mergedArray: Filter<Document>[] = [];

  for (const entry of filter) {
    const key = Object.keys(entry)[0];
    if (addedKeys.includes(key)) {
      const index = addedKeys.indexOf(key);
      mergedArray[index] = {
        [key]: { ...mergedArray[index][key], ...entry[key] },
      };
    } else {
      addedKeys.push(key);
      mergedArray.push(entry);
    }
  }

  return mergedArray;
}

function mergeFields(filter: Filter<Document>) {
  const merged: Filter<Document> = {};

  for (const key in filter) {
    if (Array.isArray(filter[key])) {
      merged[key] = mergeDuplicatedFields(filter[key]);
      continue;
    }

    if (key in merged) {
      merged[key] = {
        ...merged[key],
        ...filter[key],
      };
    } else merged[key] = filter[key];
  }

  return merged;
}
