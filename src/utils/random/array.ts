import { Randomizer } from '../../randomizer';
import { randomInteger } from './number';

/**
 * Selects a single item from the given array.
 *
 * @param {Randomizer} randomizer Randomizer to be used for picking an item from the array
 * @param {T[]} array Array of items this function selects a single item
 *
 * @returns {T} A single item taken from the given array.
 *
 * @throws {Error} When the given array is an empty value
 * @throws {TypeError} When the given array is not of type Array
 * @throws {Error} When the given array is empty
 *
 * @template T Type of items the array consists of
 */
export const pickRandomItem = <T>(randomizer: Randomizer, array: T[]): T => {
  if (!array && !Array.isArray(array))
    throw new Error(`Can't pick an item - got empty value instead of array`);

  if (!Array.isArray(array))
    throw new TypeError(
      `Can't pick an item - array type is expected (got ${typeof array})`,
    );

  if (array.length === 0) {
    throw new Error(`Can't pick an item - given array is empty`);
  }

  if (array.length === 1) {
    return array[0] as T;
  } else {
    const index = randomInteger(randomizer, 0, array.length - 1);
    return array[index] as T;
  }
};
