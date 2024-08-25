/** Possible null-lie values */
export type NullLikeValue = undefined | null | 'n/a' | 'N/A' | string | number;

/**
 * Configuration of field nullability. This defines not only how probable
 * the field will be null-like, it also specifies what type of null-like
 * value it should be.
 */
export type NullabilityConfiguration = {
  /**
   * Which {@link NullLikeValue} should be used instead of generated value.
   * When not specified, `undefined` will be used.
   */
  value?: NullLikeValue;

  /**
   * How probable should the {@link NullLikeValue} occur.
   *
   * This value should always be in range of `[0, 1]`, while `0` means never
   * and `1` means always null.
   */
  probability: number;
};
