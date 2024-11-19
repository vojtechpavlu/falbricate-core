import { SchemaInput } from '@falbricate/fw';
import { getDefaultEcosystem } from '../src';

describe('Generation of an object', () => {
  const schema: SchemaInput = {
    fields: {
      integer: 'integer?min=0&max=10',
      true: 'true',
      undefined: 'undefined',
      pastMinute: 'pastMinute'
    }
  }

  it('should compile the schema without any problem', () => {
    expect(() => getDefaultEcosystem().compile(schema)).not.toThrow()
  });

  it('should generate an expected original object shape', () => {
    const falbricator = getDefaultEcosystem().compile(schema);
    const generated = falbricator.generate();

    expect(Object.keys(generated.original)).toEqual([
      'integer',
      'true',
      'undefined',
      'pastMinute'
    ]);
  });

  it('should generate an expected original values', () => {
    const minuteBefore = Date.now() - 60 * 1000;

    const falbricator = getDefaultEcosystem().compile(schema);
    const generated = falbricator.generate();

    const integer = generated.original.integer as number;
    const pastMinute = new Date(generated.original.pastMinute as string).getTime();

    expect(generated.original.true).toBe(true);
    expect(generated.original.undefined).toBe(undefined);

    expect(integer).toBeGreaterThanOrEqual(0);
    expect(integer).toBeLessThanOrEqual(10);

    expect(pastMinute).toBeGreaterThanOrEqual(minuteBefore);
    expect(pastMinute).toBeLessThanOrEqual(Date.now());
  });
});