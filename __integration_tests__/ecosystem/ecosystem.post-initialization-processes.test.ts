import { Ecosystem, Plugin } from '../../src';

const plugin: Plugin = {
  randomizers: {
    'test-randomizer': () => {
      return () => 0.123;
    },
  },
  valueGenerators: {
    'test-value-generator': () => {
      return () => 'some-random-value';
    },
  },
};

describe('Ecosystem post-initialization processes', () => {
  describe('Randomizer tests', () => {
    it('should return whether it has existing randomizer', () => {
      const ecosystem = new Ecosystem(plugin);
      expect(ecosystem.has('randomizers', 'test-randomizer')).toBe(true);
    });

    it('should return false it has non-existing randomizer', () => {
      const ecosystem = new Ecosystem(plugin);
      expect(ecosystem.has('randomizers', 'non-existing-randomizer')).toBe(
        false,
      );
    });

    it('should return expected randomizer', () => {
      const ecosystem = new Ecosystem(plugin);

      const randomizerFactory = ecosystem.get('randomizers', 'test-randomizer');

      const randomizer = randomizerFactory();

      expect(randomizer()).toBe(0.123);
    });

    it('should throw when no such randomizer is found', () => {
      const ecosystem = new Ecosystem(plugin);
      expect(() =>
        ecosystem.get('randomizers', 'non-existing-randomizer'),
      ).toThrow(
        `No item 'non-existing-randomizer' found in registry randomizer`,
      );
    });

    it('should remove a registered randomizer', () => {
      const ecosystem = new Ecosystem(plugin);

      // Initial test whether it's registered
      expect(ecosystem.has('randomizers', 'test-randomizer')).toBe(true);

      // Remove the item
      ecosystem.remove('randomizers', 'test-randomizer');

      // Test it removed the item successfully
      expect(ecosystem.has('randomizers', 'test-randomizer')).toBe(false);
    });

    it('should not throw on removing non-existing randomizer', () => {
      const ecosystem = new Ecosystem(plugin);

      // Initial test whether it's not registered
      expect(ecosystem.has('randomizers', 'non-existing')).toBe(false);

      expect(() =>
        ecosystem.remove('randomizers', 'non-existing'),
      ).not.toThrow();
    });
  });

  describe('Value Generator tests', () => {
    it('should return whether it has existing value generator', () => {
      const ecosystem = new Ecosystem(plugin);
      expect(ecosystem.has('valueGenerators', 'test-value-generator')).toBe(
        true,
      );
    });

    it('should return false it has non-existing value generator', () => {
      const ecosystem = new Ecosystem(plugin);
      expect(
        ecosystem.has('valueGenerators', 'non-existing-value-generator'),
      ).toBe(false);
    });

    it('should return expected value generator', () => {
      const ecosystem = new Ecosystem(plugin);
      const valueGenerator = ecosystem.get(
        'valueGenerators',
        'test-value-generator',
      );

      const generatedValue = valueGenerator({
        randomizer: () => -1, // Irrelevant in this case
      });

      expect(generatedValue({ randomizer: Math.random })).toBe(
        'some-random-value',
      );
    });

    it('should throw on non-existing value generator', () => {
      const ecosystem = new Ecosystem(plugin);

      expect(() => ecosystem.get('valueGenerators', 'non-existing')).toThrow(
        `No item 'non-existing' found in registry valueGenerators`,
      );
    });

    it('should remove a registered value generator', () => {
      const ecosystem = new Ecosystem(plugin);

      // Initial test whether it's registered
      expect(ecosystem.has('valueGenerators', 'test-value-generator')).toBe(
        true,
      );

      // Remove the item
      ecosystem.remove('valueGenerators', 'test-value-generator');

      // Test it removed the item successfully
      expect(ecosystem.has('valueGenerators', 'test-value-generator')).toBe(
        false,
      );
    });

    it('should not throw on removing non-existing randomizer', () => {
      const ecosystem = new Ecosystem(plugin);

      // Initial test whether it's not registered
      expect(ecosystem.has('valueGenerators', 'non-existing')).toBe(false);

      expect(() =>
        ecosystem.remove('valueGenerators', 'non-existing'),
      ).not.toThrow();
    });
  });
});
