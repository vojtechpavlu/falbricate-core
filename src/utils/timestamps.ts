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

  if (!processor) {
    throw new Error(
      `Unrecognized option for processing timestamp into format: '${as}'. ` +
      `Use some of these: ${Object.keys(processors)}`
    );
  }

  return processor(value);
}

/**
 * Returns a list of available date time processors/formatters.
 *
 * @returns {As[]} An array of all available date processors.
 */
export const availableTimestampProcessors = (): As[] => {
  return Object.keys(processors) as As[];
}
