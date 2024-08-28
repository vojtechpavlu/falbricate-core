import {
  ValueGenerator,
  ValueGeneratorConfiguration,
  ValueGeneratorFactory,
} from '../../base';
import { GenerationContext } from '../../context';
import {
  As,
  availableTimestampProcessors,
  parseToDate,
  parseToDesiredFormat,
  randomInteger,
} from '../../../utils';

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
