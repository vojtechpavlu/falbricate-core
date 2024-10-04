export type Order = 'asc' | 'desc';

export const orderItems = <T extends string | number>(
  array: T[],
  order: Order = 'asc',
): T[] => {
  if (!Array.isArray(array)) {
    throw new TypeError(`Can't order - array is expected`);
  }

  if (!['asc', 'desc'].includes(order)) {
    throw new Error(`Can't order - unrecognized order: '${order}'`);
  }

  // Check all the items are either strings or numbers
  for (const item of array) {
    if (typeof item !== 'string' && typeof item !== 'number') {
      throw new TypeError(
        `Can't order - only strings and numbers are expected (${typeof item})`,
      );
    }
  }

  return array.sort((a, b) => {
    const isANumber = typeof a === 'number';
    const isBNumber = typeof b === 'number';

    // When both are numbers
    if (isANumber && isBNumber) {
      return order === 'asc' ? a - b : b - a;
    }

    // When both are strings
    if (!isANumber && !isBNumber) {
      return order === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
    }

    // Otherwise, when just one item is a number
    if (isANumber) {
      return order === 'asc' ? -1 : 1;
    } else {
      return order === 'desc' ? -1 : 1;
    }
  });
};
