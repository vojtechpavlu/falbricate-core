import { ValueGeneratorConfiguration } from '../generators';

export type FieldDefinition = {
  type: string;
  config?: ValueGeneratorConfiguration;
} | string;
