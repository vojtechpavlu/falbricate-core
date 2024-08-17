import { Randomizer } from '../randomizer';

export type GenerationContext = Record<string, unknown> & {
  randomizer: Randomizer;
};
