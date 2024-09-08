import { ValueGenerator, ValueGeneratorConfiguration, ValueGeneratorFactory } from '../../generators/base';
import { GenerationContext } from '../../generators/context';
import {
  As,
  availableTimestampProcessors,
  deltaTime,
  getTimeConversion,
  parseToDate,
  parseToDesiredFormat,
  randomInteger,
  TimeDirection,
  TimeUnit
} from '../../utils';

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

  if (!availableTimestampProcessors().includes(as)) {
    throw new Error(
      `Can't generate a timestamp - unrecognized option of 'as' - '${as}'. ` +
        `Try some of these: ${availableTimestampProcessors()}`,
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

/**
 * Generates a relative timestamp with optional margin. See the following example:
 *
 * ```
 * +-------------------------------------------------------+
 * | PAST      NOW                                  FUTURE |
 * | <----------X[--------][===================]---------> |
 * |              <margin>  <desired interval>             |
 * +-------------------------------------------------------+
 * ```
 *
 * E.g. you can configure the field as:
 *
 * ```
 * {
 *   direction: 'AFTER',
 *   upToUnit: 'MONTH',
 *   upToSize: 6,
 *   marginUnit: 'WEEK',
 *   marginSize: 2
 * }
 * ```
 * so the duration of specified `<margin>` will be 2 weeks and then starts
 * the interval where the timestamps will be picked from (`<desired interval>`)
 * - up to the 6 months in the future.
 *
 * In other words, the generated timestamp will be in future at least 2 weeks
 * from now and up to 6 months from now.
 *
 * @param {ValueGeneratorConfiguration} config Configuration specifying
 * the `direction` (`BEFORE` or `AFTER`), `upToUnit` and `upToSize` (the
 * farthest limit), `marginUnit` and `marginSize` (the margin limit) and
 * `as` (describing the formatting - see {@link As}).
 *
 * @returns {ValueGenerator} Value Generator being able to generate
 * relative timestamps with optional margin.
 *
 * @throws {Error} When the direction is missing or invalid
 * @throws {Error} When `upToUnit` is missing or invalid
 * @throws {Error} When `as` is invalid
 * @throws {Error} When `marginUnit` is specified but invalid
 * @throws {Error} When the total margin fills the whole interval
 */
export const relativeTimestampWithMargin: ValueGeneratorFactory = (
  config: ValueGeneratorConfiguration,
): ValueGenerator => {
  const direction = config.direction as TimeDirection;

  // The Farthest timestamp available
  const upToUnit = config.upToUnit as TimeUnit;
  const upToSize = (config.upToSize as number) ?? 1;

  // Margin size from very now
  const marginUnit = config.marginUnit as TimeUnit;
  const marginSize = config.marginSize as number;

  // Timestamp result format
  const as = (config.as ?? 'isoDatetime') as As;

  if (!['BEFORE', 'AFTER'].includes(direction)) {
    throw new Error(
      `Can't generate a relative timestamp with margin - unrecognized direction ` +
        `(got '${direction}' but allowed are 'BEFORE' and 'AFTER' only)`,
    );
  }

  if (!upToUnit) {
    throw new Error(
      `Can't generate a relative timestamp with margin - 'upToUnit' is required`,
    );
  }

  if (!upToSize) {
    throw new Error(
      `Can't generate a relative timestamp with margin - 'upToSize' is required`,
    );
  }

  // When any of these is specified
  if (marginUnit || marginSize) {
    if (!marginUnit) {
      throw new Error(
        `Can't generate a relative timestamp with margin - 'marginUnit' is required`,
      );
    }

    const totalMargin = getTimeConversion(marginUnit) * (marginSize ?? 1);
    const totalUpTo = getTimeConversion(upToUnit) * upToSize;

    if (totalMargin >= totalUpTo) {
      throw new Error(
        `Can't generate a relative timestamp with margin - the margin can't ` +
          `be greater than the whole interval`,
      );
    }
  }

  if (!availableTimestampProcessors().includes(as)) {
    throw new Error(
      `Can't generate a timestamp - unrecognized option of 'as' - '${as}'. ` +
        `Try some of these: ${availableTimestampProcessors()}`,
    );
  }

  return (context: GenerationContext) => {
    const now = Date.now();
    const upTo = deltaTime(direction, now, upToUnit, upToSize).getTime();

    let margin = now;

    // When optional margin is specified
    if (marginUnit || marginSize) {
      margin = deltaTime(direction, now, marginUnit, marginSize ?? 1).getTime();
    }

    const from = upTo < margin ? upTo : margin;
    const to = upTo < margin ? margin : upTo;

    const timestamp = randomInteger(context.randomizer, from, to);

    return parseToDesiredFormat(timestamp, as);
  };
};

/**
 * Generates a current date time formatted as configured.
 *
 * @param {ValueGeneratorConfiguration} config Configuration object
 * containing optional `as` property (of type {@link As}) - when not
 * provided, `isoDatetime` is used.
 *
 * @returns {ValueGenerator} Value generator returning a current moment.
 *
 * @throws {Error} When given unrecognized `as` option.
 */
export const nowGenerator: ValueGeneratorFactory = (
  config: ValueGeneratorConfiguration,
): ValueGenerator => {
  const as = (config.as ?? 'isoDatetime') as As;

  if (!availableTimestampProcessors().includes(as)) {
    throw new Error(
      `Can't generate a timestamp - unrecognized option of 'as' - '${as}'. ` +
        `Try some of these: ${availableTimestampProcessors()}`,
    );
  }

  return () => {
    return parseToDesiredFormat(Date.now(), as);
  };
};

export const genericGenerator = (
  direction: TimeDirection,
  unit: TimeUnit,
  n: number = 1,
): ValueGeneratorFactory => {
  return (config: ValueGeneratorConfiguration): ValueGenerator => {
    const as = (config.as ?? 'isoDatetime') as As;

    if (!availableTimestampProcessors().includes(as)) {
      throw new Error(
        `Can't generate a timestamp - unrecognized option of 'as' - '${as}'. ` +
          `Try some of these: ${availableTimestampProcessors()}`,
      );
    }

    return (context: GenerationContext) => {
      const now = new Date();
      const adjusted = deltaTime(direction, now, unit, n);

      const from =
        adjusted.getTime() > now.getTime() ? now.getTime() : adjusted.getTime();
      const to =
        adjusted.getTime() > now.getTime() ? adjusted.getTime() : now.getTime();

      const generatedTimestamp = randomInteger(context.randomizer, from, to);

      return parseToDesiredFormat(generatedTimestamp, as);
    };
  };
};
