import { RandomizerFactory } from '../randomizer';

/**
 * Basic declaration of plugin containing functionality to be
 * added into the Ecosystem.
 */
export interface Plugin {
  randomizers?: Record<string, RandomizerFactory>;
}
