/**
 * Function generating a random number within a `[0, 1]` range.
 */
export type Randomizer = () => number;

/**
 * Configuration used for {@link Randomizer} generation.
 */
export interface RandomizerConfiguration {
  [key: string]: unknown;
}

/**
 * Factory function providing a preconfigured {@link Randomizer} instance.
 */
export type RandomizerFactory = <T extends RandomizerConfiguration>(
  config?: T,
) => Randomizer;
