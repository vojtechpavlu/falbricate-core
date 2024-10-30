import { dropField } from '../../src/utils/drop-field';

const original = { key1: 1, key2: 2, key3: 3 };

describe('dropField utility function', () => {
  it('should drop the single field', () => {
    const modified = dropField(original, 'key2');
    expect(Object.keys(modified)).not.toContain('key2');
  });

  it('should maintain the order', () => {
    const modified = dropField(original, 'key2');
    expect(Object.keys(modified)).toEqual(['key1', 'key3']);
  });

  it('should remain with original values', () => {
    const modified = dropField(original, 'key2');
    expect(modified.key1).toBe(1);
    expect(modified.key3).toBe(3);
  });

  it('should not throw on field not present in the object', () => {
    expect(() => dropField(original, 'not-present')).not.toThrow();
  });

  it('should throw on not giving an array', () => {
    const input: unknown[] = [];

    // @ts-expect-error Intentionally giving in an array
    expect(() => dropField(input, 'not-present')).toThrow(
      `Can't drop field - given input must be an object (and not an array)`,
    );
  });

  it('should throw on not an object', () => {
    const input = 'not an object';

    // @ts-expect-error Intentionally giving a string
    expect(() => dropField(input, 'not-present')).toThrow(
      `Can't drop field - given input must be an object (and not an array)`,
    );
  });
});
