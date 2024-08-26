import { Randomizer } from '../randomizer';
import { Falsum } from '../falsum';

export type GenerationContext = Record<string, unknown> & {
  /** Index of the item in row */
  index?: number;

  /** {@link Randomizer} to be used for value generation */
  randomizer: Randomizer;

  /** Name of the field being currently populated */
  currentField?: string;

  /** Context given by a client */
  clientContext?: Record<string, unknown>;

  /** So far generated {@link Falsum} */
  currentFalsum?: Falsum;
};
