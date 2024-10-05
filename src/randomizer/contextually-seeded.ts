import { RandomizerContext, RandomizerFactory } from './base';

export const contextuallySeededRandomizer: RandomizerFactory = () => {
  return (context?: RandomizerContext) => {
    if (!context || !context.clientContext) {
      throw new Error(
        `Can't generate a contextually seeded random number - ` +
          `context or context.clientContext is missing`,
      );
    }

    const clientContext = context.clientContext as Record<string, unknown>;

    if (!clientContext.seed && clientContext.seed !== 0) {
      throw new Error(
        `Can't generate a contextually seeded random number - ` +
          `missing property 'seed'`,
      );
    }

    if (typeof clientContext.seed !== 'number') {
      throw new TypeError(
        `Can't generate a contextually seeded random number - ` +
          `property 'seed' must be of type number`,
      );
    }

    const modulo = (clientContext.seed * 9301 + 49_297) % 233_280;
    return modulo / 233_280;
  };
};
