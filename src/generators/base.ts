import { NullabilityConfiguration } from './nullability';
import { GenerationContext } from './context';
import { Ecosystem } from '../ecosystem';

/** General configuration mutual for all the value generators */
export interface ValueGeneratorConfiguration extends Record<string, unknown> {
  nullability?: NullabilityConfiguration;
  ecosystem?: Ecosystem;
}

/** Value Generator definition using context to generate a yet unknown value */
export type ValueGenerator = (context: GenerationContext) => unknown;

/** Factory for Value Generator */
export type ValueGeneratorFactory = (
  config: ValueGeneratorConfiguration,
) => ValueGenerator;
