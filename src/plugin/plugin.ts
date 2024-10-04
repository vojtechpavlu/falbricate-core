import { RandomizerFactory } from '../randomizer';
import { ValueGeneratorFactory } from '../generators';
import { Charset } from '../utils';
import { ObjectDefinition } from '../schema';
import { PipeFactory } from '../pipes';

/**
 * Basic declaration of plugin containing functionality to be
 * added into the Ecosystem.
 */
export interface Plugin {
  randomizers?: Record<string, RandomizerFactory>;
  valueGenerators?: Record<string, ValueGeneratorFactory>;
  charsets?: Record<string, Charset>;
  preconfigurations?: Record<string, ObjectDefinition>;
  pipes?: Record<string, PipeFactory>;
}
