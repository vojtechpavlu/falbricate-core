import { Falsum, FalsumContainer } from '../falsum';
import { PostprocessingPipeline, Schema } from '../schema';
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

  const clientContext = deepCopy(context);
  const currentFalsum = deepCopy(profiles);

  for (const field of Object.keys(schema.profiles)) {
    const fullContext: GenerationContext = {
      index,
      currentField: field,
      clientContext,
      currentFalsum,
      randomizer: () =>
        randomizer({
          index,
          profiles,
          currentField: field,
          clientContext,
          currentFalsum,
        }),
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

  const clientContext = deepCopy(context);
  const currentFalsum = deepCopy(falsum);

  for (const field of Object.keys(schema.fields)) {
    const fullContext: GenerationContext = {
      index,
      profiles,
      currentField: field,
      clientContext,
      currentFalsum,
      randomizer: () =>
        randomizer({
          index,
          profiles,
          currentField: field,
          clientContext,
          currentFalsum,
        }),
    };

    const valueGenerator = schema.fields[field] as ValueGenerator;
    falsum[field] = valueGenerator(fullContext);
  }

  const postprocessed: Record<string, unknown> = {};

  for (const branch of Object.keys(schema.postprocessing)) {
    const branchPipeline = schema.postprocessing[
      branch
    ] as PostprocessingPipeline;
    postprocessed[branch] = branchPipeline(deepCopy(falsum));
  }

  return {
    context: {
      index,
      clientContext: deepCopy(context),
      profiles: deepCopy(profiles),
    },
    schema: schema.input,
    original: falsum,
    postprocessed,
  };
};
