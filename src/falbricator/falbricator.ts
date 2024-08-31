import { Falsum } from '../falsum';
import { Schema } from '../schema';
import { GenerationContext, ValueGenerator } from '../generators';
import { Randomizer } from '../randomizer';
import { deepCopy } from '../utils/deep-copy';

export interface Falbricator {
  generate: (context?: Record<string, unknown>) => Falsum;
  generateMany: (n: number, context?: Record<string, unknown>) => Falsum[];
}

/**
 * Function responsible for creating the actual {@link Falsum}.
 *
 * @param {Schema} schema To be processed and the created Falsum based on
 * @param {Randomizer} randomizer To be used to randomize the result
 * @param {Record<string, unknown>} context Payload passed to the falbrication process
 * @param {number} index Index in the row of the current falsum being fabricated
 *
 * @returns {Falsum} Generated object matching the given schema
 */
export const generateFalsum = (
  schema: Schema,
  randomizer: Randomizer,
  context: Record<string, unknown>,
  index: number,
): Falsum => {
  const falsum: Falsum = {};

  for (const field of Object.keys(schema.fields)) {
    const fullContext: GenerationContext = {
      index,
      randomizer: randomizer,
      currentField: field,
      clientContext: deepCopy(context),
      currentFalsum: deepCopy(falsum),
    };

    const valueGenerator = schema.fields[field] as ValueGenerator;
    falsum[field] = valueGenerator(fullContext);
  }

  return falsum;
};
