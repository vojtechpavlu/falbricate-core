import { Pipe, PipeConfiguration, PipeFactory } from '../pipes';

/**
 * This {@link PipeFactory} creates a {@link Pipe} function being able to
 * turn the given value into it's stringified form.
 *
 * @param {PipeConfiguration} config Configuration consisting of an optional
 * `indent` property specifying the indentation within the result string
 * (equivalent to `JSON.stringify(object, undefined, indent)`; applied on
 * object only). When `0`, no indentation is applied.
 *
 * @returns {Pipe} Pipe function being able to turn the given values into string
 *
 * @throws {TypeError} When the specified `indent` property is not a number
 * @throws {Error} When the specified `indent` value is less than `0`
 */
export const stringifyPipe: PipeFactory = (config: PipeConfiguration): Pipe => {
  const indent = config.indent ?? 0;

  if (typeof indent !== 'number') {
    throw new TypeError(
      `Can't compile stringification pipe - unexpected indent type (${typeof indent})`,
    );
  } else if (indent < 0) {
    throw new Error(
      `Can't compile stringification pipe - indent can't be negative`,
    );
  }

  return (item: unknown) => {
    if (typeof item === 'string') {
      return item;
    } else if (typeof item === 'number') {
      return item + '';
    } else if (item instanceof Date) {
      return item.toISOString();
    }

    return indent === 0
      ? JSON.stringify(item)
      : JSON.stringify(item, undefined, indent);
  };
};
