import { Falsum } from '../falsum';

/**
 * Defines a processing pipeline by specifying names of
 * the pipe's steps - operations to be executed.
 */
export type PipelineDefinition = string[];

/**
 * Definition of postprocessing pipeline - a function that takes the generated
 * {@link Falsum} and turns it into a postprocessed value.
 */
export type PostprocessingPipeline = (falsum: Falsum) => unknown;
