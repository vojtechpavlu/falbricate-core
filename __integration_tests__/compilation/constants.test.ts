import { getDefaultEcosystem, SchemaInput } from '../../src';

describe('Constant standards', () => {
  it('should use a string constant standard', () => {
    const ecosystem = getDefaultEcosystem();

    const schema: SchemaInput = {
      fields: {
        val: '!const-test-string',
      },
    };

    const falbricate = ecosystem.compile(schema);
    const item = falbricate.generate().original;

    expect(item.val).toBe('test-string');
  });

  it('should use a number constant standard (parses it)', () => {
    const ecosystem = getDefaultEcosystem();

    const schema: SchemaInput = {
      fields: {
        val: '!const-123',
      },
    };

    const falbricate = ecosystem.compile(schema);
    const item = falbricate.generate().original;

    expect(item.val).toBe(123);
  });

  it('should use an object constant standard (parses it)', () => {
    const ecosystem = getDefaultEcosystem();

    const schema: SchemaInput = {
      fields: {
        val: '!const-{"k": "v"}',
      },
    };

    const falbricate = ecosystem.compile(schema);
    const item = falbricate.generate().original;

    // @ts-expect-error Ignore the error
    expect(item.val.k).toBe('v');
  });

  it('should use an array constant standard (parses it)', () => {
    const ecosystem = getDefaultEcosystem();

    const schema: SchemaInput = {
      fields: {
        val: '!const-["item1", "item2", 3]',
      },
    };

    const falbricate = ecosystem.compile(schema);
    const item = falbricate.generate().original;

    // @ts-expect-error Ignore the error
    expect(item.val[0]).toBe('item1');

    // @ts-expect-error Ignore the error
    expect(item.val[1]).toBe('item2');

    // @ts-expect-error Ignore the error
    expect(item.val[2]).toBe(3);
  });
});
