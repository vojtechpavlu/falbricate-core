import {
  ValueGenerator,
  ValueGeneratorConfiguration,
  ValueGeneratorFactory,
} from '../../base';
import { Charset, isCharset, randomStringOfRandomLength } from '../../../utils';
import { GenerationContext } from '../../context';
import { randomString } from '../../../utils';
import { Ecosystem } from '../../../ecosystem';

const ensureCharset = (
  possibleCharset: Charset | string,
  ecosystem?: Ecosystem,
): Charset => {
  if (typeof possibleCharset === 'string') {
    if (!ecosystem) {
      throw new Error(
        `Can't generate a random string - Charset is defined by its name ('${possibleCharset}') but ecosystem is not defined`,
      );
    } else if (ecosystem?.hasCharset(possibleCharset)) {
      return ecosystem?.getCharset(possibleCharset) as Charset;
    } else {
      throw new Error(
        `Can't generate a random string - Charset called '${possibleCharset}' not found`,
      );
    }
  }

  if (!possibleCharset) {
    throw new Error(
      `Can't generate a random string - charset is empty or is not defined`,
    );
  } else if (isCharset(possibleCharset)) {
    return possibleCharset;
  } else {
    throw new Error(
      `Can't generate a random string - charset must be an array of single-character strings`,
    );
  }
};

/**
 * Generates a string of a specified length and consisting only of characters of
 * specified {@link Charset}.
 *
 * @param {ValueGeneratorConfiguration} config Configuration containing
 * properties `length` (how long should the generated string be) and
 * `charset` (either a string as a predefined charset or {@link Charset}
 * - an array of single-character strings).
 *
 * @returns {ValueGenerator} Value generator being able to generate
 * strings of specified length.
 */
export const randomStringGenerator: ValueGeneratorFactory = (
  config: ValueGeneratorConfiguration,
): ValueGenerator => {
  const length = config.length;
  let charset = config.charset as Charset | string;

  if (typeof length !== 'number' || !Number.isInteger(length)) {
    throw new TypeError(
      `Can't generate a random string - length must be an integer`,
    );
  }

  if (length < 1) {
    throw new Error(
      `Can't generate a random string - length must be a positive non-zero integer`,
    );
  }

  charset = ensureCharset(charset, config.ecosystem);

  return (context: GenerationContext) => {
    return randomString(context.randomizer, length, charset as Charset);
  };
};

/**
 * Generator for a random string of a random length within a given range.
 *
 * @param {ValueGeneratorConfiguration} config Configuration consisting of
 * `charset` (either {@link Charset} or a string referring to a registered one),
 * optional `minLength` and required `maxLength` property.
 *
 * @returns {ValueGenerator} Value generator for producing random strings
 * of a specified charset and with bounded length.
 */
export const randomStringGeneratorOfRandomLength: ValueGeneratorFactory = (
  config: ValueGeneratorConfiguration,
): ValueGenerator => {
  const minLength = (config.minLength ?? 0) as number;
  const maxLength = config.maxLength as number;
  let charset = config.charset as Charset | string;

  if (minLength < 0) {
    throw new Error(
      `Can't generate a random string - minLength must not be negative`,
    );
  }

  if (maxLength < 0) {
    throw new Error(
      `Can't generate a random string - maxLength must not be negative`,
    );
  }

  if (minLength > maxLength) {
    throw new Error(
      `Can't generate a random string - minLength must be less or equal to maxLength`,
    );
  }

  charset = ensureCharset(charset, config.ecosystem);

  return (context: GenerationContext) => {
    return randomStringOfRandomLength(
      context.randomizer,
      charset,
      maxLength,
      minLength,
    );
  };
};
