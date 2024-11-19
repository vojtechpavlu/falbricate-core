import { ValueGenerator, ValueGeneratorFactory } from '@falbricate/fw';

/**
 * Generator providing a constant `null` value.
 *
 * @returns {ValueGenerator} providing constant `null` value.
 */
export const nullGenerator: ValueGeneratorFactory = (): ValueGenerator => {
  return () => {
    return null; // eslint-disable-line unicorn/no-null
  };
};
