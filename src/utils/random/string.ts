import { pickRandomItem } from './array';
import { Randomizer } from '../../randomizer';
import { randomInteger } from './number';
import { isCharset } from '../charset';

export const randomString = (
  randomizer: Randomizer,
  length: number,
  charset: string[],
) => {
  if (length < 0) {
    throw new Error(`The length of a string can't be negative (${length})`);
  } else if (!charset || charset.length === 0) {
    throw new Error(`The charset must consist of at least one item`);
  } else if (!isCharset(charset)) {
    throw new Error(`Given value is not a charset (must be array of single-character strings)`)
  }

  if (length === 0) {
    return '';
  } else {
    let result: string = '';
    for (let index = 0; index < length; index++) {
      result += pickRandomItem(randomizer, charset);
    }
    return result;
  }
};

export const randomStringOfRandomLength = (
  randomizer: Randomizer,
  charset: string[],
  maxLength: number,
  minLength: number = 1,
): string => {
  if (maxLength < minLength) {
    throw new Error(
      `Can't generate a random string of random length when maxLength < minLength`,
    );
  }

  return randomString(
    randomizer,
    randomInteger(randomizer, minLength, maxLength),
    charset,
  );
};
