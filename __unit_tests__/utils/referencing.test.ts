import { reference } from '../../src';

describe('reference function', () => {
  it('should retrieve a value on the specified path', () => {
    const whole = {
      nested: {
        key: 'value',
      },
    };

    expect(reference(whole, 'nested.key', false, '.')).toBe('value');
  });

  it('should be able to use different separators', () => {
    const whole = {
      nested: {
        key: 'value',
      },
    };

    expect(reference(whole, 'nested#key', false, '#')).toBe('value');
  });

  it('should retrieve undefined when empty but disabled throwing', () => {
    const whole = {
      nested: {
        key: 'value',
      },
    };

    expect(reference(whole, 'nonexisting.key', false, '.')).toBeUndefined();
  });

  it('should throw on non-existing property on path and throwing enabled', () => {
    const whole = {
      nested: {
        key: 'value',
      },
    };

    expect(() => reference(whole, 'nonexisting.key', true, '.')).toThrow(
      `Can't reference - Object not defined`,
    );
  });
});
