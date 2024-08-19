import { seededRandomizer } from '../../src';

describe('Seeded randomizer factory', () => {
  it('should fail on missing seed', () => {
    expect(() => seededRandomizer({})).toThrow(
      'Seed must be specified within the given ' +
        'configuration for seeded randomizer',
    );
  });
});

describe('Seeded randomizer', () => {
  it('should generate a float', () => {
    const randomizer = seededRandomizer({ seed: 1 });

    const generated = randomizer();

    expect(typeof generated).toBe('number');
    expect(Number.isInteger(generated)).toBe(false);
  });

  it('should generate a number within range [0, 1]', () => {
    const randomizer = seededRandomizer({ seed: 1 });

    for (let index = 0; index < 100; index++) {
      const generated = randomizer();

      expect(generated).toBeLessThanOrEqual(1);
      expect(generated).toBeGreaterThanOrEqual(0);
    }
  });

  it('should be deterministic', () => {
    const config = { seed: 1 };
    const randomizer1 = seededRandomizer(config);
    const randomizer2 = seededRandomizer(config);

    for (let index = 0; index < 100; index++) {
      const generated1 = randomizer1();
      const generated2 = randomizer2();

      expect(generated1 === generated2).toBe(true);
    }
  });
});
