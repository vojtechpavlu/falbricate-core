import { Plugin } from './plugin';
import { basicRandomizer, seededRandomizer } from '../randomizer';
import { floatGenerator, integerGenerator } from '../generators';

export const CorePlugin: Plugin = {
  randomizers: {
    basic: basicRandomizer,
    seeded: seededRandomizer,
  },
  valueGenerators: {
    integer: integerGenerator,
    float: floatGenerator,
  },
};
