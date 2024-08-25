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

/**
 * Shuffles the given array with a given randomizer.
 *
 * @param {Randomizer} randomizer Randomizer to be used for shuffling the array
 * @param {T[]} array Array to be shuffled
 *
 * @returns {T[]} Deep copy of the given array with changed order of items
 *
 * @throws {Error} When the given value is not an array
 * @throws {Error} When the given array is empty
 *
 * @template T Type of items given in the array
 */
export const shuffleArray = <T>(randomizer: Randomizer, array: T[]): T[] => {
  if (!Array.isArray(array) || array.length === 0) {
    throw new Error(`Can't shuffle the given array - expected non-empty array`);
  }

  const copy: T[] = structuredClone(array);

  for (let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
    const switchIndex = randomInteger(randomizer, 0, currentIndex);
    const temporary = copy[switchIndex] as T;
    copy[switchIndex] = copy[currentIndex] as T;
    copy[currentIndex] = temporary;
  }

  return copy;
};

/**
 * Takes a sample with variable length within a range.
 *
 * @param {Randomizer} randomizer Randomizer to be used for picking the sample
 * @param {T[]} array Array the sample should be based on
 * @param {number} maxItems Maximum number of items returned
 * @param {number} minItems Minimum number of items returned (`0` by default)
 *
 * @returns {T[]} A sample (subset) of the given array with a random length
 * within a specified interval
 *
 * @throws {Error} When the given value is not an array
 * @throws {Error} When the given array is empty
 * @throws {Error} When `maxItems` < 1
 * @throws {Error} When `minItems` < 0
 * @throws {Error} When `maxItems` < `minItems`
 * @throws {Error} When the length of the array does not fit even for the
 * `minItems` bound
 *
 * @template T Type of items given in the array
 */
export const selectSample = <T>(
  randomizer: Randomizer,
  array: T[],
  maxItems: number,
  minItems: number = 0,
): T[] => {
  if (!array && !Array.isArray(array)) {
    throw new Error(`Can't make a sample - got empty value instead of array`);
  } else if (!Array.isArray(array)) {
    throw new TypeError(
      `Can't make a sample - array type is expected (got ${typeof array})`,
    );
  } else if (array.length === 0) {
    throw new Error(`Can't make a sample - given array is empty`);
  }

  if (maxItems === minItems) {
    return [pickRandomItem(randomizer, array)];
  } else if (maxItems < 1) {
    throw new Error(`Can't make a sample - 'maxItems' must be at least 1`);
  } else if (minItems < 0) {
    throw new Error(`Can't make a sample - 'minItems' must be at least 1`);
  } else if (maxItems < minItems) {
    throw new Error(
      `Can't make a sample - 'maxItems' must be greater or equal to 'minItems' ` +
        `(${maxItems} < ${minItems})`,
    );
  } else if (array.length < minItems) {
    throw new Error(
      `Can't make a sample - given array must have at least ${minItems} (minItems)`,
    );
  }

  maxItems = maxItems <= array.length ? maxItems : array.length;

  const nItems = randomInteger(randomizer, minItems, maxItems);

  return shuffleArray(randomizer, array).slice(0, nItems);
};
