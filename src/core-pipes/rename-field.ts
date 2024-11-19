import { Pipe, PipeConfiguration, PipeFactory } from '@falbricate/fw';
import { renameField } from '../utils';

export const renameFieldPipe: PipeFactory = (
  config: PipeConfiguration,
): Pipe => {
  const originalName = config.old as string;
  const desiredName = config.new as string;

  if (!originalName || !desiredName) {
    throw new Error(
      `Can't rename a field - both 'old' and 'new' fields are required`,
    );
  }

  return (input: unknown) => {
    return renameField(
      input as Record<string, unknown>,
      originalName,
      desiredName,
    );
  };
};
