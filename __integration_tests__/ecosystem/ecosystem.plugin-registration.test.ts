import { Ecosystem } from '../../src';
import { Plugin } from '../../src';

describe('Ecosystem handling Plugin registration', () => {
  it('should register all the randomizers', () => {
    const ecosystem = new Ecosystem();
    const plugin: Plugin = {
      randomizers: {
        'custom-test-randomizer': () => {
          return () => -50;
        },
      },
    };

    ecosystem.register(plugin);

    expect(ecosystem.hasRandomizerFactory('custom-test-randomizer')).toBe(true);

    expect(() =>
      ecosystem.getRandomizerFactory('custom-test-randomizer'),
    ).not.toThrow();

    const randomizerFactory = ecosystem.getRandomizerFactory(
      'custom-test-randomizer',
    );

    const randomizer = randomizerFactory();

    expect(randomizer()).toBe(-50);
  });

  it('should register all the value generators', () => {
    const ecosystem = new Ecosystem();
    const plugin: Plugin = {
      valueGenerators: {
        'custom-test-value-generator': () => {
          return () => 'test';
        },
      },
    };

    ecosystem.register(plugin);

    expect(
      ecosystem.hasValueGeneratorFactory('custom-test-value-generator'),
    ).toBe(true);

    expect(() =>
      ecosystem.getValueGeneratorFactory('custom-test-value-generator'),
    ).not.toThrow();

    const valueGeneratorFactory = ecosystem.getValueGeneratorFactory(
      'custom-test-value-generator',
    );

    const valueGenerator = valueGeneratorFactory({});

    expect(valueGenerator({ randomizer: () => 1 })).toBe('test');
  });
});
