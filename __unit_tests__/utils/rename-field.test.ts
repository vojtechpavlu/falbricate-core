import { renameField } from '../../src';

describe('renameField utility function', () => {
  it('should rename the field within an object', () => {
    const object = { test1: 123 };
    const modified = renameField(object, 'test1', 'test2');
    expect(Object.keys(modified)).toContain('test2');
  });

  it('should not modify the value', () => {
    const object = { test1: 123 };
    const modified = renameField(object, 'test1', 'test2');
    expect(modified.test2).toBe(123);
  });

  it('should not modify other fields', () => {
    const object = { test1: 123, doNotChange: 321 };
    const modified = renameField(object, 'test1', 'test2');
    expect(Object.keys(modified)).toContain('doNotChange');
  });

  it('should maintain the order of keys', () => {
    const object = { key1: 1, key2: 2, key3: 3 };
    const modified = renameField(object, 'key2', 'here');
    expect(Object.keys(modified)).toEqual(['key1', 'here', 'key3']);
  });

  it('should throw on not object', () => {
    const object = 'not-an-object';

    // @ts-expect-error Intentionally giving a non-object value
    expect(() => renameField(object, 'key2', 'here')).toThrow(
      `Can't rename a field within an object - input must be an object (and not an array)`,
    );
  });

  it('should throw on array', () => {
    const object: unknown[] = [];

    // @ts-expect-error Intentionally giving an array
    expect(() => renameField(object, 'key2', 'here')).toThrow(
      `Can't rename a field within an object - input must be an object (and not an array)`,
    );
  });

  it('should throw on empty oldName', () => {
    const object = { oldName: 'value' };

    expect(() => renameField(object, '', 'desiredName')).toThrow(
      `Can't rename a field within an object - property 'oldName' not given or empty`,
    );
  });

  it('should throw on empty desiredName', () => {
    const object = { oldName: 'value' };

    expect(() => renameField(object, 'oldName', '')).toThrow(
      `Can't rename a field within an object - property 'desiredName' not given or empty`,
    );
  });

  it('should throw on object not containing the oldName field', () => {
    const object = { oldName: 'value' };

    expect(() => renameField(object, 'notContained', 'desiredName')).toThrow(
      `Can't rename a field within an object - property 'notContained' not present`,
    );
  });
});
