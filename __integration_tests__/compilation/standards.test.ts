import { getDefaultEcosystem, SchemaInput } from '../../src';

describe('Standards', () => {
  it('should be able to deal with standard value generators', () => {
    const ecosystem = getDefaultEcosystem();

    const schema: SchemaInput = {
      fields: {
        testTrue: 'true',
        testFalse: 'false',
      },
    };

    const falbricate = ecosystem.compile(schema);
    const generated = falbricate.generate();

    expect(generated.testTrue).toBe(true);
    expect(generated.testFalse).toBe(false);
  });
});
