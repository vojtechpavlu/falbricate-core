import { Falsum, FalsumContainer } from '../falsum';
import { Schema } from '../schema';
import { GenerationContext, ValueGenerator } from '../generators';
import { Randomizer } from '../randomizer';
import { deepCopy } from '../utils/deep-copy';

export interface Falbricator {
  generate: (context?: Record<string, unknown>) => FalsumContainer;
  generateMany: (
    n: number,
    context?: Record<string, unknown>,
  ) => FalsumContainer[];
}

export const generateProfiles = (
  schema: Schema,
  randomizer: Randomizer,
  context: Record<string, unknown>,
  index: number,
): Record<string, unknown> => {
  const profiles: Record<string, unknown> = {};

  for (const field of Object.keys(schema.profiles)) {
    const fullContext: GenerationContext = {
      index,
      randomizer: randomizer,
      currentField: field,
      clientContext: deepCopy(context),
      currentFalsum: deepCopy(profiles),
    };

    const valueGenerator = schema.profiles[field] as ValueGenerator;
    profiles[field] = valueGenerator(fullContext);
  }

  return profiles;
};

/**
 * Function responsible for creating the actual {@link Falsum}.
 *
 * @param {Schema} schema To be processed and the created Falsum based on
 * @param {Randomizer} randomizer To be used to randomize the result
 * @param {Record<string, unknown>} context Payload passed to the falbrication process
 * @param {Record<string, unknown>} profiles Profile fields used to share truth
 * across the whole fabrication process
 * @param {number} index Index in the row of the current falsum being fabricated
 *
 * @returns {Falsum} Generated object matching the given schema
 */
export const generateFalsum = (
  schema: Schema,
  randomizer: Randomizer,
  context: Record<string, unknown>,
  profiles: Record<string, unknown>,
  index: number,
): FalsumContainer => {
  const falsum: Falsum = {};

  for (const field of Object.keys(schema.fields)) {
    const fullContext: GenerationContext = {
      index,
      profiles,
      randomizer: randomizer,
      currentField: field,
      clientContext: deepCopy(context),
      currentFalsum: deepCopy(falsum),
    };

    const valueGenerator = schema.fields[field] as ValueGenerator;
    falsum[field] = valueGenerator(fullContext);
  }

  return {
    context: {
      index,
      clientContext: deepCopy(context),
      profiles: deepCopy(profiles),
    },
    schema: schema.input,
    original: falsum,
  };
};
