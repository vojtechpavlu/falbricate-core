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
  constantGenerator,
  pickingGenerator,
  samplingGenerator,
  nestedObject,
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

    // Constant value
    constant: constantGenerator,

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

    // Arrays
    pick: pickingGenerator,
    sample: samplingGenerator,

    // Objects
    nested: nestedObject,
  },
};
