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
  tensGenerator,
  undefinedGenerator,
  nullGenerator,
} from '../generators';

export const CorePlugin: Plugin = {
  randomizers: {
    basic: basicRandomizer,
    constant: constantRandomizer,
    seeded: seededRandomizer,
  },
  valueGenerators: {
    // Empty values
    undefined: undefinedGenerator,
    null: nullGenerator,

    // Booleans
    boolean: randomBoolean,
    true: constantTrue,
    false: constantFalse,

    // Numerics
    integer: integerGenerator,
    float: floatGenerator,
    units: unitsGenerator,
    tens: tensGenerator,
    hundreds: hundredsGenerator,
    thousands: thousandsGenerator,
  },
};
