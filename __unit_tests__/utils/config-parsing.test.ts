import { parseConfigString } from '../../src';

describe('in-line config parsing', () => {
  it('should handle single value', () => {
    const configString = 'integer=3'
    const configuration = parseConfigString(configString);

    expect(configuration.integer).toBe(3);
  });

  it('should handle multiple values of different types', () => {
    const configString = 'integer=3&string=asdf&float=3.14'
    const configuration = parseConfigString(configString);

    expect(configuration.integer).toBe(3);
    expect(configuration.string).toBe('asdf');
    expect(configuration.float).toBe(3.14);
  });

  it('should handle arrays by repeating a key', () => {
    const configString = 'integers=0&integers=1&integers=2'
    const configuration = parseConfigString(configString);

    const integers = configuration.integers as number[];

    expect(integers.length).toBe(3);

    for (const [index, integer] of integers.entries()) {
      expect(integer).toBe(index);
    }
  });

  it('should handle arrays by explicitly defining it', () => {
    const configString = 'integers=[0,1,2]'
    const configuration = parseConfigString(configString);

    const integers = configuration.integers as number[];

    expect(integers.length).toBe(3);

    for (const [index, integer] of integers.entries()) {
      expect(integer).toBe(index);
    }
  });

  it('should handle objects', () => {
    const configString = 'object={"string":"test-string","number":9}'
    const configuration = parseConfigString(configString);

    const object = configuration.object as Record<string, unknown>;

    expect(object.string).toBe('test-string');
    expect(object.number).toBe(9);
  });

  it('should handle spaces', () => {
    const configString = 'string1=my string&string2=my another string'
    const configuration = parseConfigString(configString);

    const testString1 = configuration.string1 as string;
    const testString2 = configuration.string2 as string;

    expect(testString1).toBe('my string');
    expect(testString2).toBe('my another string');
  });
});
