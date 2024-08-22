import { Falsum } from '../falsum';
import { Schema } from '../schema';
import { ValueGenerator } from '../generators';
import { Randomizer } from '../randomizer';

export interface Falbricator {
  generate: () => Falsum;
  generateMany: (n: number) => Falsum[];
}

/**
 * Function responsible for creating the actual {@link Falsum}.
 *
 * @param {Schema} schema To be processed and the created Falsum based on
 * @param {Randomizer} randomizer To be used to randomize the result
 * @param {Record<string, unknown>} contextPayload Payload passed to the falbrication process
 *
 * @returns {Falsum} Generated object matching the given schema
 */
export const generateFalsum = (
  schema: Schema,
  randomizer: Randomizer,
  contextPayload?: Record<string, unknown>,
): Falsum => {
  const falsum: Falsum = {};

  for (const field of Object.keys(schema.fields)) {
    const valueGenerator = schema.fields[field] as ValueGenerator;
    falsum[field] = valueGenerator({ ...contextPayload, randomizer });
  }

  return falsum;
};
