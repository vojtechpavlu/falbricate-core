import { parseToDate } from '../../src';

describe('parseToDate utility function', () => {
  it('should return the original date', () => {
    const now = new Date();
    const after = parseToDate(now);

    expect(after.getTime()).toBe(now.getTime());
  });

  it('should generate a date from a valid date string', () => {
    const dateString: string = '2000-07-11';

    // Totally f*cked up behaviour of JS' date library...
    expect(parseToDate(dateString).getFullYear()).toBe(2000);
    expect(parseToDate(dateString).getMonth()).toBe(6);
    expect(parseToDate(dateString).getDate()).toBe(11);
  });

  it('should generate a date from a valid date time string', () => {
    const dateString: string = '2000-07-11T17:28:43';

    // Totally f*cked up behaviour of JS' date library...
    expect(parseToDate(dateString).getHours()).toBe(17);
    expect(parseToDate(dateString).getMinutes()).toBe(28);
    expect(parseToDate(dateString).getSeconds()).toBe(43);
  });

  it('should generate a date from a valid numeric timestamp', () => {
    const timestamp: number = 953_039_515_777;

    // Totally f*cked up behaviour of JS' date library...
    expect(parseToDate(timestamp).getUTCFullYear()).toBe(2000);
    expect(parseToDate(timestamp).getUTCMonth()).toBe(2);
    expect(parseToDate(timestamp).getUTCDate()).toBe(14);
    expect(parseToDate(timestamp).getUTCHours()).toBe(13);
    expect(parseToDate(timestamp).getUTCMinutes()).toBe(11);
    expect(parseToDate(timestamp).getUTCSeconds()).toBe(55);
    expect(parseToDate(timestamp).getUTCMilliseconds()).toBe(777);
  });

  it('should throw on undefined', () => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    expect(() => parseToDate(undefined)).toThrow(
      `Can't parse the given date: undefined`,
    );
  });

  it('should throw on null', () => {
    // eslint-disable-next-line unicorn/no-null
    expect(() => parseToDate(null)).toThrow(`Can't parse the given date: null`);
  });

  it('should throw on an array', () => {
    expect(() => parseToDate([])).toThrow(`Can't parse the given date: []`);
  });

  it('should throw on an object', () => {
    expect(() => parseToDate({})).toThrow(`Can't parse the given date: {}`);
  });
});
