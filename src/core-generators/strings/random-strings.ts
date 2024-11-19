import {
  ValueGenerator,
  ValueGeneratorConfiguration,
  ValueGeneratorFactory,
  GenerationContext,
  Charset,
  isCharset,
  randomString,
  randomStringOfRandomLength,
  Ecosystem,
} from '@falbricate/fw';

/**
 * Tries to retrieve a {@link Charset} from other possible forms.
 *
 * @param {unknown} possibleCharset Value that might or might not be a valid charset
 * or a name that can be found in the {@link Ecosystem}.
 *
 * @param {Ecosystem} ecosystem Used as a store of {@link Charset}s
 *
 * @returns {Charset} Charset the given value matches to
 */
const ensureCharset = (
  possibleCharset: unknown,
  ecosystem?: Ecosystem,
): Charset => {
  if (typeof possibleCharset === 'string') {
    if (!ecosystem) {
      throw new Error(
        `Can't generate a random string - Charset is defined by its name ('${possibleCharset}') but ecosystem is not defined`,
      );
    } else if (ecosystem?.has('charsets', possibleCharset)) {
      return ecosystem?.get('charsets', possibleCharset) as Charset;
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
    return possibleCharset as Charset;
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
