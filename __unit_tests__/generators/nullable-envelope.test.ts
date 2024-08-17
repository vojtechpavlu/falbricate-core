import { NullableEnvelope } from '../../src';

describe('Nullable Envelope - Marginal cases', () => {
  it('should never generate a null-like value for probability=0', () => {
    const config = { probability: 0 };
    const randomizer = Math.random;

    for (let index = 0; index < 100; index++) {
      expect(NullableEnvelope(randomizer, () => 'asdf', config)).toBe('asdf');
    }
  });

  it('should always generate a null-like value for probability=1', () => {
    const config = { probability: 1 };
    const randomizer = Math.random;

    for (let index = 0; index < 100; index++) {
      expect(
        NullableEnvelope(randomizer, () => 'asdf', config),
      ).toBeUndefined();
    }
  });
});
