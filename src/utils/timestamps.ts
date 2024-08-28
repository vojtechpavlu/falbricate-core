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
