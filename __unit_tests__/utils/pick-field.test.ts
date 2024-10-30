import { pickField } from '../../src';

const original = { key1: 1, key2: 2, key3: 3 };

describe('pickField utility function', () => {
  it('should pick a single field', () => {
    const modified = pickField(original, 'key1');
    expect(modified).toEqual({ key1: 1 });
  });

  it('should pick multiple fields', () => {
    const modified = pickField(original, ['key1', 'key2']);
    expect(modified).toEqual({ key1: 1, key2: 2 });
  });

  it('should fail on key not being present', () => {
    expect(() => pickField(original, 'not-present')).toThrow(
      `Can't pick a field - field 'not-present' is not present in the object`,
    );
  });

  it('should fail on key in multiple keys not being present', () => {
    expect(() => pickField(original, ['key2', 'not-present'])).toThrow(
      `Can't pick a field - field 'not-present' is not present in the object`,
    );
  });
});
