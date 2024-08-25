import { ValueGeneratorConfiguration } from '../generators';

/**
 * Verbose declaration of a field. This declaration is being used to
 * use further functionality of value generators; some ever requires
 * the further configuration.
 */
type ObjectDefinition = {
  /**
   * Type of the Value generator; must match to any of the
   * imported ones to the Ecosystem
   */
  type: string;

  /**
   * Comment of the field used as a documentation within objects. Contents of
   * this property are not being processed.
   */
  comment?: string;

  /**
   * Example results of this field's Value generator. Contents of this property
   * are not being processed.
   */
  examples?: unknown;

  /**
   * Configuration of the Value generator.
   */
  config?: ValueGeneratorConfiguration;
};

/**
 * Global field definition being either a full descriptive object
 * declaration or a simple string (usually for standard values only).
 */
export type FieldDefinition = ObjectDefinition | string;
