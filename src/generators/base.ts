import { NullabilityConfiguration } from './nullability';
import { GenerationContext } from './context';

/** General configuration mutual for all the value generators */
export interface ValueGeneratorConfiguration extends Record<string, unknown> {
  nullability?: NullabilityConfiguration;
}

/** Value Generator definition using context to generate a yet unknown value */
export type ValueGenerator = (context: GenerationContext) => unknown;

/** Factory for Value Generator */
export type ValueGeneratorFactory = (
  config: ValueGeneratorConfiguration,
) => ValueGenerator;
