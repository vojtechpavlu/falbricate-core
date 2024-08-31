/** Recognized time directions */
export type TimeDirection = 'BEFORE' | 'AFTER';

/** Recognized time units */
export type TimeUnit =
  | 'MILLISECOND'
  | 'SECOND'
  | 'MINUTE'
  | 'HOUR'
  | 'DAY'
  | 'WEEK'
  | 'MONTH'
  | 'YEAR'
  | 'CENTURY';

/** Registry of all time conversion coefficients from a unit to milliseconds */
const TimeConversion: { [u in TimeUnit]: number } = {
  MILLISECOND: 1,
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000,
  YEAR: 365 * 24 * 60 * 60 * 1000,
  CENTURY: 100 * 365 * 24 * 60 * 60 * 1000,
};

/**
 * Tries to find an expected time conversion by the specified name.
 *
 * @param {TimeUnit} name Name of the unit
 *
 * @returns {number} Numeric conversion from the unit to milliseconds.
 *
 * @throws {Error} When no such conversion coefficient is found.
 */
export const getTimeConversion = (name: TimeUnit): number => {
  const conversion = TimeConversion[name];

  if (!conversion) {
    throw new Error(`Unrecognized time conversion name: '${name}'`);
  }

  return conversion;
};

/**
 * Adjusts the given timestamp for the specified number of units in a given
 * direction.
 *
 * @param {TimeDirection} direction Direction in which should the date be switched
 * @param {number | Date} origin Original date that should be modified
 * @param {TimeUnit} timeUnit Time unit in which the `n` is being calculated in
 * @param {number} n Number of time units for which should the given original timestamp
 * be moved for
 *
 * @returns {Date} New instance of `Date` representing switched point in time
 *
 * @throws {Error} When the `direction` is not a recognized {@link TimeDirection}
 * @throws {Error} When the given `date` is not to be parsed into a date
 */
export const deltaTime = (
  direction: TimeDirection,
  origin: number | Date,
  timeUnit: TimeUnit,
  n: number,
): Date => {
  const numericDate = new Date(origin).getTime();
  const timeConversion = getTimeConversion(timeUnit);
  let coefficient = 0;

  if (direction === 'BEFORE') {
    coefficient = -1;
  } else if (direction === 'AFTER') {
    coefficient = 1;
  } else {
    throw new Error(
      `Unrecognized direction: '${direction}' - allowed values are 'BEFORE' and 'AFTER'`,
    );
  }

  return new Date(numericDate + coefficient * n * timeConversion);
};

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
  isoDate: (value: number) => {
    // Create a Date object using the provided timestamp
    const date = new Date(value);

    // Extract the year, month, and day in UTC with leading zeros where needed
    const [year, month, day] = [
      date.getUTCFullYear(),

      // Months are zero-based in JS, so add 1
      String(date.getUTCMonth() + 1).padStart(2, '0'),
      String(date.getUTCDate()).padStart(2, '0'),
    ];

    // Combine into a date string
    return `${year}-${month}-${day}`;
  },

  /* Turns the given value into `HH:MM:SS.sss` string format */
  isoTime: (value: number) => {
    // Create a Date object using the provided timestamp
    const date = new Date(value);

    // Extract the hours, minutes, seconds and milliseconds with leading zeros
    const [hours, minutes, seconds, milliseconds] = [
      String(date.getUTCHours()).padStart(2, '0'),
      String(date.getUTCMinutes()).padStart(2, '0'),
      String(date.getUTCSeconds()).padStart(2, '0'),
      String(date.getUTCMilliseconds()).padStart(3, '0'),
    ];

    // Combine into a time string
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  },

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

  throw new Error(`Can't parse the given date: ${JSON.stringify(value)}`);
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
      `Unrecognized option for processing timestamp into format '${as}'. ` +
        `Use some of these: ${Object.keys(processors).join(', ')}`,
    );
  }

  return processor(value);
};

/**
 * Returns a list of available date time processors/formatters.
 *
 * @returns {As[]} An array of all available date processors.
 */
export const availableTimestampProcessors = (): As[] => {
  return Object.keys(processors) as As[];
};

export const getTimestampProcessor = (name: As): Processor => {
  const processor = processors[name] as Processor;
  if (!processor) {
    throw new Error(`Timestamp Processor with name '${name}' not found`);
  }

  return processor;
};
