import {
  compileSchemaInput,
  generateFalsum,
  getDefaultEcosystem,
  Schema,
  SchemaInput,
} from '../../src';

const schemaInput: SchemaInput = {
  randomizer: {
    name: 'constant',
    config: {
      value: 0.5,
    },
  },
  fields: {
    age1: {
      type: 'integer',
      config: {
        max: 100,
      },
    },
    age2: {
      type: 'integer',
      config: {
        max: 10,
      },
    },
  },
};

const schema: Schema = compileSchemaInput(schemaInput, getDefaultEcosystem());

describe('generateFalsum function', () => {
  it('should generate a falsum of an expected shape', () => {
    const falsum = generateFalsum(
      schema,
      schema.randomizerFactory(schema.randomizerConfig),
      {},
      {},
      0,
    );

    expect(Object.keys(falsum).length).toBe(2);
    expect(typeof falsum.age1).toBe('number');
    expect(typeof falsum.age2).toBe('number');
  });

  it('should generate expected values', () => {
    const falsum = generateFalsum(
      schema,
      schema.randomizerFactory(schema.randomizerConfig),
      {},
      {},
      0,
    );

    expect(falsum.age1).toBe(50);
    expect(falsum.age2).toBe(5);
  });
});
