const { Ecosystem, getDefaultEcosystem } = require('@falbricate/core');

describe('Importing a custom plugin into Ecosystem', () => {
  it('should include the given plugin', () => {
    const plugin = {
      valueGenerators: {
        'test-value-generator': () => {
          return () => 'generated-test-value';
        },
      },
    };

    const ecosystem = new Ecosystem();
    ecosystem.register(plugin);

    expect(ecosystem.has('valueGenerators', 'test-value-generator')).toBe(
      true,
    );
  });

  it('should be able to reach the imported resources', () => {
    const plugin = {
      valueGenerators: {
        'test-value-generator': () => {
          return () => 'generated-test-value';
        },
      },
    };

    const ecosystem = getDefaultEcosystem();
    ecosystem.register(plugin);

    const schema = {
      fields: {
        testField: 'test-value-generator',
      },
    };

    const falbricate = ecosystem.compile(schema);
    const generated = falbricate.generate().original;
    expect(generated.testField).toBe('generated-test-value');
  });
});
