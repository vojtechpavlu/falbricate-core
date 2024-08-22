import { RandomizerFactory } from '../randomizer';
import { ValueGeneratorFactory } from '../generators';

/**
 * Basic declaration of plugin containing functionality to be
 * added into the Ecosystem.
 */
export interface Plugin {
  randomizers?: Record<string, RandomizerFactory>;
  valueGenerators?: Record<string, ValueGeneratorFactory>;
}
