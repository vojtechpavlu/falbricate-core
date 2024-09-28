import { SchemaInput } from '../schema';

/** Represents a generated object */
export type Falsum = Record<string, unknown>;

/**
 * Container holding not only the generated {@link Falsum},
 * but also all the used and available metadata.
 */
export interface FalsumContainer {
  /** Given context used for the {@link Falsum} generation */
  context: {
    index: number;
    clientContext: Record<string, unknown>;
    profiles: Record<string, unknown>;
  };

  /** Schema used for everything to be generated */
  schema: SchemaInput;

  /** Originally generated {@link Falsum} */
  original: Falsum;

  /** Postprocessing of the original {@link Falsum} */
  postprocessed: Record<string, unknown>;
}
