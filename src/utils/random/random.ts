import { Randomizer } from '../../randomizer';

/**
 * Generates a random integer number within a specified range using
 * the given randomizer.
 *
 * @param {Randomizer} randomizer Randomizer used to generate a random number
 * @param {number} min Lower bound of the interval
 * @param {number} max Upper bound of the interval
 *
 * @returns {number} Random number within a specified range
 */
export const randomInteger = (
  randomizer: Randomizer,
  min: number,
  max: number,
): number => {
  if (min > max) {
    throw new Error(
      `Lower bound of the interval can't be greater than the upper bound: ${min} > ${max}`,
    );
  }

  return Math.floor(randomizer() * (max - min + 1)) + min;
};

/**
 * Generates a random float number within a specified range using
 * the given randomizer.
 *
 * @param {Randomizer} randomizer Randomizer used to generate a random number
 * @param {number} min Lower bound of the interval
 * @param {number} max Upper bound of the interval
 * @param {number} decimalDigits Number of decimal digits (`= 2` by default)
 *
 * @returns {number} Random number within a specified range
 */
export const randomFloat = (
  randomizer: Randomizer,
  min: number,
  max: number,
  decimalDigits: number = 2,
): number => {
  if (min > max) {
    throw new Error(
      `Lower bound of the interval can't be greater than the upper bound: ${min} > ${max}`,
    );
  } else if (decimalDigits < 0) {
    throw new Error(`Number of decimal digits has to be non-negative`);
  } else if (decimalDigits >= 100) {
    throw new Error(`Number of decimal digits has to be lower than 100`);
  }

  const randomFloat = randomizer() * (max - min) + min;
  return Number.parseFloat(randomFloat.toFixed(decimalDigits));
};
