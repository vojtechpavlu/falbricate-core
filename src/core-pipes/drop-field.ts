import { Pipe, PipeConfiguration, PipeFactory } from '../pipes';
import { dropField } from '../utils/drop-field';

export const dropFieldPipe: PipeFactory = (config: PipeConfiguration): Pipe => {
  const field = config.field as (string | string[]);

  if (!field) {
    throw new Error(`Can't drop a field - not specified field to be dropped`);
  }

  let toDrop: string[] = [];

  if (Array.isArray(field)) {
    toDrop = [...field]
  }

  if (typeof field === 'string') {
    toDrop = [field]
  }

  return (input: unknown) => {
    let modified = input as Record<string, unknown>;

    for (const item of toDrop) {
      modified = dropField(modified, item) as Record<string, unknown>
    }

    return modified;
  };
};
