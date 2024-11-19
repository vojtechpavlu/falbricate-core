import { Pipe, PipeFactory } from '@falbricate/fw';

/**
 * Helper function to turn a camel-case string into snake-cased one.
 *
 * @param {string} value Value to be turned into snake-case form.
 *
 * @returns {string} Snake-case formed string
 */
const camelToSnake = (value: string): string => {
  return value.replaceAll(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

/**
 * This {@link PipeFactory} creates a {@link Pipe} function being
 * able to turn the keys of the input object into snake-case format
 * (e.g. `someKey` -> `some_key`).
 *
 * @returns {Pipe} Pipe being able to turn keys into a snake-case format.
 */
export const snakeCasePipe: PipeFactory = (): Pipe => {
  const internalPipe: Pipe = (input: unknown) => {
    // When empty value or type of the input is not an object
    if (!input || typeof input !== 'object') {
      return input;
    }

    // When it's an array, process each item recursively
    if (Array.isArray(input)) {
      return input.map((item) => internalPipe(item));
    }

    const casedInput = input as Record<string, unknown>;
    const result: Record<string, unknown> = {};

    // For each key within the object
    for (const key of Object.keys(casedInput)) {
      // Process the key to be snake-cased
      const snakeKey = camelToSnake(key);

      // Process the value recursively
      result[snakeKey] = internalPipe(casedInput[key]);
    }

    return result;
  };

  return internalPipe;
};
