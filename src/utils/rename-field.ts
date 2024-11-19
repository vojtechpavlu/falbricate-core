import { deepCopy } from '@falbricate/fw';

export const renameField = (
  object: Record<string, unknown>,
  oldName: string,
  desiredName: string,
): Record<string, unknown> => {
  if (typeof object !== 'object' || Array.isArray(object)) {
    throw new TypeError(
      `Can't rename a field within an object - input must be an object (and not an array)`,
    );
  }

  if (!oldName) {
    throw new Error(
      `Can't rename a field within an object - property 'oldName' not given or empty`,
    );
  }

  if (!desiredName) {
    throw new Error(
      `Can't rename a field within an object - property 'desiredName' not given or empty`,
    );
  }

  if (!Object.keys(object).includes(oldName)) {
    throw new Error(
      `Can't rename a field within an object - property '${oldName}' not present`,
    );
  }

  const modifiedObject: Record<string, unknown> = {};

  // For each key of given object
  for (const key of Object.keys(object)) {
    if (key === oldName) {
      // When you encounter the field to be renamed
      modifiedObject[desiredName] = deepCopy(object[oldName]);
    } else {
      modifiedObject[key] = deepCopy(object[key]);
    }
  }

  return modifiedObject;
};
