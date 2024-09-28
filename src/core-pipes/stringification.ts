import { Pipe, PipeConfiguration, PipeFactory } from '../pipes';

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
