/**
 * Removes 'optional' attributes from a type's properties.
 * https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
 */
export type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
