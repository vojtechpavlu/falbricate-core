import {
  ValueGenerator,
  ValueGeneratorConfiguration,
  ValueGeneratorFactory,
} from '../../base';
import { Charset, isCharset } from '../../../utils';
import { GenerationContext } from '../../context';
import { randomString } from '../../../utils';

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

  if (typeof charset === 'string') {
    if (!config.ecosystem) {
      throw new Error(
        `Can't generate a random string - Charset is defined by its name ('${charset}') but ecosystem is not defined`,
      );
    } else if (config.ecosystem?.hasCharset(charset)) {
      charset = config.ecosystem?.getCharset(charset) as Charset;
    } else {
      throw new Error(
        `Can't generate a random string - Charset called '${charset}' not found`,
      );
    }
  }

  if (!charset) {
    throw new Error(
      `Can't generate a random string - charset is empty or is not defined`,
    );
  } else if (!isCharset(charset)) {
    throw new Error(
      `Can't generate a random string - charset must be an array of single-character strings`,
    );
  }

  return (context: GenerationContext) => {
    return randomString(context.randomizer, length, charset as Charset);
  };
};
