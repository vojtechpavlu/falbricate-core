import { getDefaultEcosystem, Plugin, SchemaInput } from '../../src';

const testPlugin: Plugin = {
  preconfigurations: {
    myPreconfiguration: {
      type: 'integer',
      config: {
        min: -101,
        max: -100,
      },
    },
  },
};

describe('Preconfigurations standards', () => {
  it('should be able to register preconfigurations', () => {
    const ecosystem = getDefaultEcosystem();

    ecosystem.register(testPlugin);

    expect(ecosystem.has('preconfigurations', 'myPreconfiguration')).toBe(true);
  });

  it('should be able to use it', () => {
    const ecosystem = getDefaultEcosystem();
    ecosystem.register(testPlugin);

    const schema: SchemaInput = {
      fields: {
        val: '!conf-myPreconfiguration',
      },
    };

    const falbricate = ecosystem.compile(schema);
    const item = falbricate.generate().original;

    expect(item.val).toBeGreaterThanOrEqual(-101);
    expect(item.val).toBeLessThanOrEqual(-100);
  });
});
