import { deepCopy } from './deep-copy';

export const dropField = (
  object: Record<string, unknown>,
  field: string
): Record<string, unknown> => {
  if (typeof object !== 'object' || Array.isArray(object)) {
    throw new TypeError(`Can't drop field - given input must be an object (and not an array)`)
  }

  const modifiedObject: Record<string, unknown> = {};

  for (const key of Object.keys(object)) {
    if (key !== field) {
      modifiedObject[key] = deepCopy(object[key]);
    }
  }

  return modifiedObject;
}
