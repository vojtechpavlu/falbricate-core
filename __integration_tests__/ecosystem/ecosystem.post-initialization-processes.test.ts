import { Ecosystem, Plugin } from '../../src';

const plugin: Plugin = {
  randomizers: {
    'test-randomizer': () => {
      return () => 0.123;
    },
  },
  valueGenerators: {
    'test-value-generator': () => 'some-random-value',
  },
};

describe('Ecosystem post-initialization processes', () => {
  describe('Randomizer tests', () => {
    it('should return whether it has existing randomizer', () => {
      const ecosystem = new Ecosystem(false, plugin);
      expect(ecosystem.hasRandomizerFactory('test-randomizer')).toBe(true);
    });

    it('should return false it has non-existing randomizer', () => {
      const ecosystem = new Ecosystem(false, plugin);
      expect(ecosystem.hasRandomizerFactory('non-existing-randomizer')).toBe(
        false,
      );
    });

    it('should return expected randomizer', () => {
      const ecosystem = new Ecosystem(false, plugin);
      const randomizerFactory =
        ecosystem.getRandomizerFactory('test-randomizer');
      const randomizer = randomizerFactory();

      expect(randomizer()).toBe(0.123);
    });

    it('should throw when no such randomizer is found', () => {
      const ecosystem = new Ecosystem(false, plugin);
      expect(() =>
        ecosystem.getRandomizerFactory('non-existing-randomizer'),
      ).toThrow(
        `No item 'non-existing-randomizer' found in registry randomizer`,
      );
    });

    it('should remove a registered randomizer', () => {
      const ecosystem = new Ecosystem(false, plugin);

      // Initial test whether it's registered
      expect(ecosystem.hasRandomizerFactory('test-randomizer')).toBe(true);

      // Remove the item
      ecosystem.removeRandomizer('test-randomizer');

      // Test it removed the item successfully
      expect(ecosystem.hasRandomizerFactory('test-randomizer')).toBe(false);
    });

    it('should not throw on removing non-existing randomizer', () => {
      const ecosystem = new Ecosystem(false, plugin);

      // Initial test whether it's not registered
      expect(ecosystem.hasRandomizerFactory('non-existing')).toBe(false);

      expect(() => ecosystem.removeRandomizer('non-existing')).not.toThrow();
    });
  });

  describe('Value Generator tests', () => {
    it('should return whether it has existing value generator', () => {
      const ecosystem = new Ecosystem(false, plugin);
      expect(ecosystem.hasValueGenerator('test-value-generator')).toBe(true);
    });

    it('should return false it has non-existing value generator', () => {
      const ecosystem = new Ecosystem(false, plugin);
      expect(ecosystem.hasValueGenerator('non-existing-value-generator')).toBe(
        false,
      );
    });

    it('should return expected value generator', () => {
      const ecosystem = new Ecosystem(false, plugin);
      const valueGenerator = ecosystem.getValueGenerator(
        'test-value-generator',
      );

      const generatedValue = valueGenerator({
        randomizer: () => -1, // Irrelevant in this case
      });

      expect(generatedValue).toBe('some-random-value');
    });

    it('should throw on non-existing value generator', () => {
      const ecosystem = new Ecosystem(false, plugin);

      expect(() => ecosystem.getValueGenerator('non-existing')).toThrow(
        `No item 'non-existing' found in registry value-generator`,
      );
    });

    it('should remove a registered value generator', () => {
      const ecosystem = new Ecosystem(false, plugin);

      // Initial test whether it's registered
      expect(ecosystem.hasValueGenerator('test-value-generator')).toBe(true);

      // Remove the item
      ecosystem.removeValueGenerator('test-value-generator');

      // Test it removed the item successfully
      expect(ecosystem.hasValueGenerator('test-value-generator')).toBe(false);
    });

    it('should not throw on removing non-existing randomizer', () => {
      const ecosystem = new Ecosystem(false, plugin);

      // Initial test whether it's not registered
      expect(ecosystem.hasValueGenerator('non-existing')).toBe(false);

      expect(() =>
        ecosystem.removeValueGenerator('non-existing'),
      ).not.toThrow();
    });
  });
});
