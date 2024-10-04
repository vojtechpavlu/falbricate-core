import { getDefaultEcosystem, SchemaInput } from '../../src';

describe('Inline configurations', () => {
  it('should accept inline configurations', () => {
    const ecosystem = getDefaultEcosystem();

    const schema: SchemaInput = {
      fields: {
        integer: 'integer?min=15&max=20',
      },
    };

    const falbricate = ecosystem.compile(schema);
    const item = falbricate.generate().original;

    expect(typeof item.integer).toBe('number');
    expect(item.integer).toBeGreaterThanOrEqual(15);
    expect(item.integer).toBeLessThanOrEqual(20);
  });
});
