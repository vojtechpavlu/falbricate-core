import { deepCopy } from '@falbricate/fw';

export const dropField = (
  object: Record<string, unknown>,
  field: string | string[],
): Record<string, unknown> => {
  if (typeof object !== 'object' || Array.isArray(object)) {
    throw new TypeError(
      `Can't drop field - given input must be an object (and not an array)`,
    );
  }

  let toBeDropped: string[] = [];

  if (typeof field === 'string') {
    toBeDropped = [field];
  } else if (Array.isArray(field)) {
    toBeDropped = [...field];
  }

  const modifiedObject: Record<string, unknown> = {};

  for (const key of Object.keys(object)) {
    if (!toBeDropped.includes(key)) {
      modifiedObject[key] = deepCopy(object[key]);
    }
  }

  return modifiedObject;
};
