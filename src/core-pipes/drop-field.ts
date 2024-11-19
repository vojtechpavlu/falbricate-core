import { Pipe, PipeConfiguration, PipeFactory } from '@falbricate/fw';
import { dropField } from '../utils';

export const dropFieldPipe: PipeFactory = (config: PipeConfiguration): Pipe => {
  const field = config.field as string | string[] | unknown;

  if (!field) {
    throw new Error(`Can't drop a field - not specified field to be dropped`);
  }

  let toDrop: string[] = [];

  if (Array.isArray(field)) {
    toDrop = [...field];
  } else if (typeof field === 'string') {
    toDrop = [field];
  } else {
    throw new TypeError(
      `Can't drop a field - unrecognized type '${typeof field}'`,
    );
  }

  return (input: unknown) => {
    let modified = input as Record<string, unknown>;

    for (const item of toDrop) {
      modified = dropField(modified, item) as Record<string, unknown>;
    }

    return modified;
  };
};
