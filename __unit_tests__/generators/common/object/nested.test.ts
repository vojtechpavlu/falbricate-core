import { getDefaultEcosystem } from '../../../../src';
import { Falbricator, SchemaInput } from '@falbricate/fw';

describe('Nested object Value Generator', () => {
  it('should generate Falsum with the expected nested object', () => {
    const ecosystem = getDefaultEcosystem();

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
          type: 'object',
          config: {
            schema: nestedSchema,
            ecosystem: ecosystem,
          },
        },
      },
    };

    const falbricator: Falbricator = ecosystem.compile(schemaInput);
    const generated = falbricator.generate().original;

    console.log(JSON.stringify(generated, undefined, 2));

    // @ts-expect-error Generated is intentionally unknown
    expect(generated.nestedField.testField).toBe('test-value');
  });
});
