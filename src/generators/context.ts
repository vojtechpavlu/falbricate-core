import { Randomizer } from '../randomizer';
import { Falsum } from '../falsum';
import { ValueGenerator } from './base';

/**
 * Describes the context given to each {@link ValueGenerator} containing
 * various important properties of the current {@link Falsum} generation.
 */
export type GenerationContext = Record<string, unknown> & {
  /**
   * Index of the {@link Falsum} in row.
   *
   * Relevant mostly when generating multiple Falsa at the same time using
   * {@link Falbricator#generateMany}.
   */
  index?: number;

  /** {@link Randomizer} to be used for value generation */
  randomizer: Randomizer;

  /** Name of the field being currently populated */
  currentField?: string;

  /** Context given by a client */
  clientContext?: Record<string, unknown>;

  /** So far generated {@link Falsum} */
  currentFalsum?: Falsum;

  /**
   * Profiles; i.e. fields that are generated but won't be part of the
   * fabricated {@link Falsum} object. These are meant just as a single point of
   * shared truth the {@link ValueGenerator}s are expected to refer to.
   */
  profiles?: Record<string, unknown>
};
