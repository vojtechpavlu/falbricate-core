import { constantGenerator } from '../../../../src';

const randomizer = Math.random;

describe('constants value generator', () => {
  it('should return a given value', () => {
    const generator = constantGenerator({
      value: 'test-value',
    });

    expect(generator({ randomizer })).toBe('test-value');
  });

  it('should make a deep copy', () => {
    const value = {
        nested: {
          nestedAgain: 'test-value',
        }
      };

    const generator = constantGenerator({ value });

    // Change the value
    value.nested.nestedAgain = 'changed-value';

    // @ts-expect-error the generated value is of type unknown
    expect(generator({ randomizer }).nested.nestedAgain).toBe('test-value');
  });

  it('should be able to deal with undefined', () => {
    const generator = constantGenerator({ value: undefined });
    expect(generator({ randomizer })).toBeUndefined();
  });

  it('should be able to deal with empty list', () => {
    const generator = constantGenerator({ value: [] });

    const generated = generator({ randomizer });

    expect(Array.isArray(generated)).toBe(true);
    expect((generated as []).length).toBe(0);
  });
});
