/**
 * Returns whether the given value is a valid charset (i.e. an array
 * of single-character strings).
 *
 * @param {unknown} array A value to be tested whether it's a valid charset.
 *
 * @returns {boolean} Boolean information whether the given value
 * is a valid charset
 */
export const isCharset = (array: unknown): boolean => {
  if (!Array.isArray(array)) {
    return false;
  }

  for (const item of array) {
    if (typeof item !== "string") {
       return false;
    } else if (item.length !== 1) {
       return false;
    }
  }

  return true;
}
