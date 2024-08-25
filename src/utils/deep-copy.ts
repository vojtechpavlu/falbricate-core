/**
 * Creates a deep copy of a given value.
 *
 * @param {T} value Value to be copied.
 *
 * @returns {T} A deep copy of the given value.
 *
 * @throws {TypeError} When the value is not of a recognized type.
 *
 * @template T Type of the given value
 */
export const deepCopy = <T>(value: T): T => {
  // Primitive types
  if (typeof value !== 'object') return value;

  // Handling date objects
  if (value instanceof Date) return new Date(value.getDate()) as T;

  // Handling arrays
  if (Array.isArray(value)) return value.map((item) => deepCopy(item)) as T;

  // Handling maps
  if (value instanceof Map) {
    const copy = new Map();
    for (const [k, v] of value.entries()) copy.set(k, deepCopy(v));
    return copy as T;
  }

  // Handling sets
  if (value instanceof Set) {
    const copy = new Set();
    for (const item of value) copy.add(deepCopy(item));
    return copy as T;
  }

  if (typeof value === 'object') {
    const copy = {} as T;
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        copy[key] = deepCopy(value[key]);
      }
    }
    return copy as T;
  }

  throw new TypeError(
    `Unsupported data type to make a deep copy (${typeof value})`,
  );
};
