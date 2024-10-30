import { deepCopy } from './deep-copy';

export const pickField = (
  object: Record<string, unknown>,
  field: string | string[],
): Record<string, unknown> => {
  if (typeof object !== 'object' || Array.isArray(object)) {
    throw new TypeError(
      `Can't pick a field - given input must be an object (and not an array)`,
    );
  }

  let toBePicked: string[] = [];

  if (typeof field === 'string') {
    if (!Object.keys(object).includes(field)) {
      throw new Error(
        `Can't pick a field - field '${field}' is not present in the object`,
      );
    }

    toBePicked = [field];
  } else if (Array.isArray(field)) {
    for (const fieldName of field) {
      if (!Object.keys(object).includes(fieldName)) {
        throw new Error(
          `Can't pick a field - field '${fieldName}' is not present in the object`,
        );
      }
    }

    toBePicked = [...field];
  }

  const modifiedObject: Record<string, unknown> = {};

  for (const key of Object.keys(object)) {
    if (toBePicked.includes(key)) {
      modifiedObject[key] = deepCopy(object[key]);
    }
  }

  return modifiedObject;
};
