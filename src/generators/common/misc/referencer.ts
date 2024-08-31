import { ValueGenerator, ValueGeneratorConfiguration, ValueGeneratorFactory } from '../../base';
import { GenerationContext } from '../../context';
import { reference } from '../../../utils';

export const referencerGenerator: ValueGeneratorFactory = (
  config: ValueGeneratorConfiguration
): ValueGenerator => {
  const path = config.path as string;
  const onEmptyThrow = config.onEmptyThrow === undefined ? false : config.onEmptyThrow as boolean;
  const separator = (config.separator as string) ?? '.';

  if (!path) {
    throw new Error(`Unable to reference - 'path' is a required field`);
  }

  return (context: GenerationContext) => {
    return reference(context, path, onEmptyThrow, separator);
  };
}