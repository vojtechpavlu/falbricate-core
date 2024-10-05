import { contextDependentRandomizer } from '../../src';

describe('Context dependent randomizer', () => {
  describe('Configuration', () => {
    it('should handle a missing configuration', () => {
      expect(() => contextDependentRandomizer()).not.toThrow();
    });

    it('should throw on modulo not being a number', () => {
      expect(() => contextDependentRandomizer({ modulo: 'NaN' })).toThrow(
        `Can't generate a contextually dependent number - property 'modulo' is not a number`,
      );
    });

    it('should throw on modulo being zero', () => {
      expect(() => contextDependentRandomizer({ modulo: 0 })).toThrow(
        `Can't generate a contextually dependent number - property 'modulo' is zero`,
      );
    });
  });

  describe('Randomization', () => {
    it('should generate a float number', () => {
      const randomizer = contextDependentRandomizer();
      const value = randomizer({ hello: 'world' });

      // Verify it's a number
      expect(typeof value).toBe('number');

      // Verify it's a finite number
      expect(Number.isFinite(value)).toBe(true);

      // Verify it's not an integer
      expect(Number.isInteger(value)).toBe(false);
    });

    it('should generate a number within a range [0, 1]', () => {
      const randomizer = contextDependentRandomizer();
      const value = randomizer({ hello: 'world' });

      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(1);
    });

    it('should generate always different value in progression with same context', () => {
      const randomizer = contextDependentRandomizer();

      // Using the same randomizer instance but twice
      const value1 = randomizer({ hello: 'world' });
      const value2 = randomizer({ hello: 'world' });

      expect(value1 === value2).toBe(false);
    });

    it('should generate always the same value when using two randomizers', () => {
      const randomizer1 = contextDependentRandomizer();
      const randomizer2 = contextDependentRandomizer();

      // Using two separate instances of randomizer
      const value1 = randomizer1({ hello: 'world' });
      const value2 = randomizer2({ hello: 'world' });

      expect(value1 === value2).toBe(true);
    });
  });
});
