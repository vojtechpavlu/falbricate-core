import { Ecosystem, SchemaInput } from '../../src';

describe('Referencing', () => {
  it('should be able to reference to context', () => {
    const ecosystem = new Ecosystem();

    const schema: SchemaInput = {
      fields: {
        indexValue: {
          type: 'reference',
          config: {
            path: 'index',
          },
        },
      },
    };

    const falbricate = ecosystem.compile(schema);
    const generatedItems = falbricate.generateMany(5);

    for (const [index, item] of generatedItems.entries()) {
      expect(item.indexValue).toBe(index);
    }
  });

  it('should be able to direct-reference to context', () => {
    const ecosystem = new Ecosystem();

    const schema: SchemaInput = {
      fields: {
        indexValue: '!ref-index',
      },
    };

    const falbricate = ecosystem.compile(schema);
    const generatedItems = falbricate.generateMany(5);

    for (const [index, item] of generatedItems.entries()) {
      expect(item.indexValue).toBe(index);
    }
  });
});
