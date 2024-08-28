import {
  ValueGenerator,
  ValueGeneratorConfiguration,
  ValueGeneratorFactory,
} from '../../base';
import { GenerationContext } from '../../context';
import { randomInteger } from '../../../utils';

/** Options in which the timestamp can be transformed into */
export type As = 'date' | 'isoDatetime' | 'isoDate' | 'isoTime' | 'timestamp';

/** Helper timestamp transformer type definition */
type Processor = (value: number) => unknown;

/**
 * Processor used to alter the randomly selected date within
 * a specified range to a desired form.
 */
const processors: { [index in As]: Processor } = {
  /* Turns the given value into a {@link Date} object */
  date: (value: number) => new Date(value),

  /* Turns the given value into a string in the common datetime ISO format */
  isoDatetime: (value: number) => new Date(value).toISOString(),

  /* Turns the given value into `YYYY-MM-DD` string format */
  isoDate: (value: number) => new Date(value).toISOString().split('T')[0],

  /* Turns the given value into `HH:MM:SS.sss` string format */
  isoTime: (value: number) => new Date(value).toISOString().split('T')[1],

  /* Simply returns the timestamp as a number */
  timestamp: (value: number) => value,
};

/**
 * Processes the given input into a {@link Date} object.
 *
 * @param {unknown} value Value of unknown type to be parsed into a date object.
 *
 * @returns {Date} Date object created by parsing the given value.
 *
 * @throws {Error} When the given object type is not supported.
 */
export const parseToDate = (value: unknown): Date => {
  if (value instanceof Date) {
    return value;
  } else if (typeof value === 'string' || typeof value === 'number') {
    return new Date(value);
  }

  throw new Error(`Can't parse the given date: ${value}`);
};

/**
 * Turns the given timestamp (represented by a number) into a desired format.
 *
 * @param {number} value Timestamp to be turned into the desired format
 * @param {As} as The desired format description
 *
 * @returns {unknown} Point in time represented in the desired format
 */
export const parseToDesiredFormat = (value: number, as: As): unknown => {
  const processor = processors[as] as Processor;
  return processor(value);
}

/**
 * Generates a random timestamp within a specified range.
 *
 * @param {ValueGeneratorConfiguration} config Configuration containing required
 * properties `from` and `to` representing input date (as a number or a string)
 * and optional `as` (see {@link As}; `isoDatetime` is default).
 *
 * @returns {ValueGenerator} Value generator being able to select a random
 * timestamp within a specified time range.
 *
 * @throws {Error} When the `from` property is missing
 * @throws {Error} When the `to` property is missing
 * @throws {Error} When the `as` is not recognized.
 */
export const timestampGenerator: ValueGeneratorFactory = (
  config: ValueGeneratorConfiguration,
): ValueGenerator => {
  if (!config.from && config.from !== 0) {
    throw new Error(
      `Can't generate a timestamp - configuration property 'from' is missing`,
    );
  }

  if (!config.to && config.to !== 0) {
    throw new Error(
      `Can't generate a timestamp - configuration property 'to' is missing`,
    );
  }

  const from = parseToDate(config.from);
  const to = parseToDate(config.to);

  const as = (config.as ?? 'isoDatetime') as As;

  if (!Object.keys(processors).includes(as)) {
    throw new Error(
      `Can't generate a timestamp - unrecognized option of 'as' - '${as}'. Try some of [${Object.keys(processors)}]`,
    );
  }

  return (context: GenerationContext) => {
    const generatedTimestamp = randomInteger(
      context.randomizer,
      from.getTime(),
      to.getTime(),
    );

    return parseToDesiredFormat(generatedTimestamp, as);
  };
};
