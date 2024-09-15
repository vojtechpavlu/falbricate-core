import { Plugin } from '../plugin';
import {
  basicRandomizer,
  constantRandomizer,
  seededRandomizer,
} from '../randomizer';
import {
  constantFalse,
  constantGenerator,
  constantTrue,
  floatGenerator,
  genericGenerator,
  hundredsGenerator,
  integerGenerator,
  nestedArrayGenerator,
  nestedObject,
  nowGenerator,
  nullGenerator,
  pickingGenerator,
  randomBoolean,
  randomStringGenerator,
  randomStringGeneratorOfRandomLength,
  referencerGenerator,
  relativeTimestampWithMargin,
  samplingGenerator,
  stringSwitchExpression,
  stringTemplateGenerator,
  tensGenerator,
  thousandsGenerator,
  timestampGenerator,
  undefinedGenerator,
  unitsGenerator,
  uuidGenerator,
  xorGenerator,
} from '../core-generators';
import { Ecosystem } from '../ecosystem';

export const CorePlugin: Plugin = {
  randomizers: {
    basic: basicRandomizer,
    constant: constantRandomizer,
    seeded: seededRandomizer,
  },
  charsets: {
    lowercases: [...'abcdefghijklmnopqrstuvwxyz'],
    uppercases: [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'],
    numbers: [...'0123456789'],
    specials: [...String.raw`?!.+-*%#_`],
    letters: [...'abcdefghijklmnopqrstuvwxyz', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'],
    alphanumerics: [
      ...'abcdefghijklmnopqrstuvwxyz',
      ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      ...'0123456789',
    ],
    characters: [
      ...'abcdefghijklmnopqrstuvwxyz',
      ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      ...'0123456789',
      ...String.raw`?!.+-*%#_`,
    ],
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

    // Strings
    stringOfLength: randomStringGenerator,
    stringOfRandomLength: randomStringGeneratorOfRandomLength,
    template: stringTemplateGenerator,

    // Timestamps
    datetime: timestampGenerator,
    datetimeWithMargin: relativeTimestampWithMargin,
    now: nowGenerator,

    // Past Timestamp units
    pastCentury: genericGenerator('BEFORE', 'CENTURY'),
    pastYear: genericGenerator('BEFORE', 'YEAR'),
    past5Years: genericGenerator('BEFORE', 'YEAR', 5),
    past10Years: genericGenerator('BEFORE', 'YEAR', 10),
    past15Years: genericGenerator('BEFORE', 'YEAR', 15),
    past20Years: genericGenerator('BEFORE', 'YEAR', 20),
    past50Years: genericGenerator('BEFORE', 'YEAR', 50),
    pastMonth: genericGenerator('BEFORE', 'MONTH'),
    past3Months: genericGenerator('BEFORE', 'MONTH', 3),
    past6Months: genericGenerator('BEFORE', 'MONTH', 6),
    past9Months: genericGenerator('BEFORE', 'MONTH', 9),
    pastWeek: genericGenerator('BEFORE', 'WEEK'),
    past2Weeks: genericGenerator('BEFORE', 'WEEK', 2),
    past3Weeks: genericGenerator('BEFORE', 'WEEK', 3),
    pastDay: genericGenerator('BEFORE', 'DAY'),
    pastHour: genericGenerator('BEFORE', 'HOUR'),
    past6Hours: genericGenerator('BEFORE', 'HOUR', 6),
    past12Hours: genericGenerator('BEFORE', 'HOUR', 12),
    past18Hours: genericGenerator('BEFORE', 'HOUR', 18),
    pastMinute: genericGenerator('BEFORE', 'MINUTE'),
    past10Minutes: genericGenerator('BEFORE', 'MINUTE', 10),
    past15Minutes: genericGenerator('BEFORE', 'MINUTE', 15),
    past30Minutes: genericGenerator('BEFORE', 'MINUTE', 30),
    past45Minutes: genericGenerator('BEFORE', 'MINUTE', 45),
    pastSecond: genericGenerator('BEFORE', 'SECOND'),
    past10Seconds: genericGenerator('BEFORE', 'SECOND', 10),
    past30Seconds: genericGenerator('BEFORE', 'SECOND', 30),

    // Future Timestamp units
    nextCentury: genericGenerator('AFTER', 'CENTURY'),
    nextYear: genericGenerator('AFTER', 'YEAR'),
    next5Years: genericGenerator('AFTER', 'YEAR', 5),
    next10Years: genericGenerator('AFTER', 'YEAR', 10),
    next15Years: genericGenerator('AFTER', 'YEAR', 15),
    next20Years: genericGenerator('AFTER', 'YEAR', 20),
    next50Years: genericGenerator('AFTER', 'YEAR', 50),
    nextMonth: genericGenerator('AFTER', 'MONTH'),
    next3Months: genericGenerator('AFTER', 'MONTH', 3),
    next6Months: genericGenerator('AFTER', 'MONTH', 6),
    next9Months: genericGenerator('AFTER', 'MONTH', 9),
    nextWeek: genericGenerator('AFTER', 'WEEK'),
    next2Weeks: genericGenerator('AFTER', 'WEEK', 2),
    next3Weeks: genericGenerator('AFTER', 'WEEK', 3),
    nextDay: genericGenerator('AFTER', 'DAY'),
    nextHour: genericGenerator('AFTER', 'HOUR'),
    next6Hours: genericGenerator('AFTER', 'HOUR', 6),
    next12Hours: genericGenerator('AFTER', 'HOUR', 12),
    next18Hours: genericGenerator('AFTER', 'HOUR', 18),
    nextMinute: genericGenerator('AFTER', 'MINUTE'),
    next10Minutes: genericGenerator('AFTER', 'MINUTE', 10),
    next15Minutes: genericGenerator('AFTER', 'MINUTE', 15),
    next30Minutes: genericGenerator('AFTER', 'MINUTE', 30),
    next45Minutes: genericGenerator('AFTER', 'MINUTE', 45),
    nextSecond: genericGenerator('AFTER', 'SECOND'),
    next10Seconds: genericGenerator('AFTER', 'SECOND', 10),
    next30Seconds: genericGenerator('AFTER', 'SECOND', 30),

    // Arrays
    pick: pickingGenerator,
    sample: samplingGenerator,
    array: nestedArrayGenerator,

    // Objects
    object: nestedObject,

    // Expressions
    stringSwitch: stringSwitchExpression,

    // Misc
    reference: referencerGenerator,
    uuid: uuidGenerator,
    xor: xorGenerator,
  },
};

/**
 * Returns a default {@link Ecosystem} instance with predefined
 * core plugin.
 *
 * @returns {Ecosystem} Ecosystem with predefined {@link CorePlugin}
 * functionality - generators, randomizers, etc.
 */
export const getDefaultEcosystem = (): Ecosystem => {
  return new Ecosystem(CorePlugin);
};
