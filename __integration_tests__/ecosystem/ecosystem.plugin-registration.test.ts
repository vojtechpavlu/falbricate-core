import { Ecosystem, Plugin } from '../../src';

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

    expect(ecosystem.has('randomizers', 'custom-test-randomizer')).toBe(true);

    expect(() =>
      ecosystem.get('randomizers', 'custom-test-randomizer'),
    ).not.toThrow();

    const randomizerFactory = ecosystem.get(
      'randomizers',
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
      ecosystem.has('valueGenerators', 'custom-test-value-generator'),
    ).toBe(true);

    expect(() =>
      ecosystem.get('valueGenerators', 'custom-test-value-generator'),
    ).not.toThrow();

    const valueGeneratorFactory = ecosystem.get(
      'valueGenerators',
      'custom-test-value-generator',
    );

    const valueGenerator = valueGeneratorFactory({});

    expect(valueGenerator({ randomizer: () => 1 })).toBe('test');
  });
});
