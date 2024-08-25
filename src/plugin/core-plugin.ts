import { Plugin } from './plugin';
import {
  basicRandomizer,
  constantRandomizer,
  seededRandomizer,
} from '../randomizer';
import {
  floatGenerator,
  integerGenerator,
  constantTrue,
  constantFalse,
  randomBoolean,
  unitsGenerator,
  hundredsGenerator,
  thousandsGenerator,
} from '../generators';

export const CorePlugin: Plugin = {
  randomizers: {
    basic: basicRandomizer,
    constant: constantRandomizer,
    seeded: seededRandomizer,
  },
  valueGenerators: {
    integer: integerGenerator,
    float: floatGenerator,
    boolean: randomBoolean,
    true: constantTrue,
    false: constantFalse,
    units: unitsGenerator,
    tens: unitsGenerator,
    hundreds: hundredsGenerator,
    thousands: thousandsGenerator,
  },
};
