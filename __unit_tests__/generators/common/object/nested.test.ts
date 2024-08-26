import { Falbricator, Ecosystem, SchemaInput } from '../../../../src';

describe('Nested object Value Generator', () => {
  it('should generate Falsum with the expected nested object', () => {
    const ecosystem = new Ecosystem();

    const nestedSchema: SchemaInput = {
      fields: {
        testField: {
          type: 'constant',
          config: { value: 'test-value' },
        },
      },
    };

    const schemaInput: SchemaInput = {
      fields: {
        nestedField: {
          type: 'nested',
          config: {
            schema: nestedSchema,
            ecosystem: ecosystem,
          },
        },
      },
    };

    const falbricator: Falbricator = ecosystem.compile(schemaInput);
    const generated = falbricator.generate();

    // @ts-expect-error Generated is intentionally unknown
    expect(generated.nestedField.testField).toBe('test-value');
  });
});
