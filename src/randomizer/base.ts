export type RandomizerContext = Record<string, unknown>;

/**
 * Function generating a random number within a `[0, 1]` range.
 */
export type Randomizer = (context?: RandomizerContext) => number;

/**
 * Configuration used for {@link Randomizer} generation.
 */
export type RandomizerConfiguration = Record<string, unknown>;

/**
 * Factory function providing a preconfigured {@link Randomizer} instance.
 */
export type RandomizerFactory = (
  config?: RandomizerConfiguration,
) => Randomizer;
