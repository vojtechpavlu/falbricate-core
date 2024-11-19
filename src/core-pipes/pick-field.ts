import { Pipe, PipeConfiguration, PipeFactory } from '@falbricate/fw';
import { pickField } from '../utils';

export const pickFieldPipe: PipeFactory = (config: PipeConfiguration): Pipe => {
  const field = config.field as string | string[] | unknown;

  if (!field) {
    throw new Error(
      `Can't pick a field - not specified field or fields to be picked`,
    );
  }

  // When not a string and at the same time its not an array
  if (typeof field !== 'string' && !Array.isArray(field)) {
    throw new TypeError(
      `Can't pick a field - unrecognized type '${typeof field}'`,
    );
  }

  return (input: unknown) => {
    return pickField(input as Record<string, unknown>, field);
  };
};
