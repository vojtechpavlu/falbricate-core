import { RandomizerFactory } from '../randomizer';
import { ValueGenerator } from '../generators';

/**
 * Basic declaration of plugin containing functionality to be
 * added into the Ecosystem.
 */
export interface Plugin {
  randomizers?: Record<string, RandomizerFactory>;
  valueGenerators?: Record<string, ValueGenerator>;
}
