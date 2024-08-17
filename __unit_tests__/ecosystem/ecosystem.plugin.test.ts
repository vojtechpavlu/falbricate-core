import { Ecosystem } from '../../src';
import { Plugin } from '../../src';

describe('Ecosystem handling Plugins', () => {
  it('should register all the randomizers', () => {
    const ecosystem = new Ecosystem();
    const plugin: Plugin = {
      randomizers: {
        'custom-test-randomizer': () => {
          return () => -50;
        }
      }
    };

    ecosystem.register(plugin);

    expect(() => ecosystem.getRandomizerFactory('custom-test-randomizer'))
      .not.toThrow();

    const randomizerFactory = ecosystem.getRandomizerFactory('custom-test-randomizer');
    const randomizer = randomizerFactory();

    expect(randomizer()).toBe(-50)
  });
});