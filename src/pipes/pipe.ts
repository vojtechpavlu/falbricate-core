/**
 * Configuration specifying the expected behaviour of the {@link Pipe}
 * by passing it to the {@link PipeFactory}.
 */
export type PipeConfiguration = Record<string, unknown>;

/**
 * Actual processor of the given value into another one.
 */
export type Pipe = (input: unknown) => unknown;

/**
 * Factory being able to preconfigure a {@link Pipe} with specified
 * {@link PipeConfiguration}.
 */
export type PipeFactory = (config: PipeConfiguration) => Pipe;
