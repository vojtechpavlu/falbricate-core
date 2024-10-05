import {
  Randomizer,
  RandomizerConfiguration,
  RandomizerContext,
  RandomizerFactory,
} from './base';
import { stringToHashNumber } from '../utils';

/**
 * This {@link RandomizerFactory} is responsible for creating a deterministic
 * {@link Randomizer} being able to generate a number within a range of
 * `[0, 1]` based on the given context.
 *
 * @param {RandomizerConfiguration} config Configuration object expecting
 * optional parameter `modulo` being a non-zero number.
 *
 * @returns {Randomizer} Deterministic randomizer generating a float numbers
 * within a range of `[0, 1]` depending on the given context.
 */
export const contextDependentRandomizer: RandomizerFactory = (
  config?: RandomizerConfiguration,
): Randomizer => {
  let currentValue = 0;
  const modulo =
    config && config.modulo !== undefined ? config.modulo : 233_280;

  if (typeof modulo !== 'number') {
    throw new TypeError(
      `Can't generate a contextually dependent number - property 'modulo' is not a number`,
    );
  }

  if (modulo === 0) {
    throw new Error(
      `Can't generate a contextually dependent number - property 'modulo' is zero`,
    );
  }

  return (context?: RandomizerContext) => {
    if (!context) {
      throw new Error(
        `Can't generate a contextually dependent number - context not provided`,
      );
    }

    const hash = stringToHashNumber(JSON.stringify(context));
    currentValue = hash + ((currentValue * 9301 + 49_297) % modulo);

    return (currentValue % modulo) / modulo;
  };
};
