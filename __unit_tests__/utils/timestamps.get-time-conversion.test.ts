import { getTimeConversion } from '../../src';

describe('getTimeConversion function', () => {
  it('should return an expected value (in milliseconds)', () => {
    expect(getTimeConversion('MILLISECOND')).toBe(1);
    expect(getTimeConversion('SECOND')).toBe(1000);
    expect(getTimeConversion('MINUTE')).toBe(60_000);
    expect(getTimeConversion('HOUR')).toBe(3_600_000);
    expect(getTimeConversion('DAY')).toBe(86_400_000);
    expect(getTimeConversion('WEEK')).toBe(604_800_000);
    expect(getTimeConversion('MONTH')).toBe(2_592_000_000);
    expect(getTimeConversion('YEAR')).toBe(31_536_000_000);
    expect(getTimeConversion('CENTURY')).toBe(3_153_600_000_000);
  });

  it('should throw on unexpected value', () => {
    // @ts-expect-error Not a valid unit
    expect(() => getTimeConversion('not a unit')).toThrow(
      `Unrecognized time conversion name: 'not a unit'`,
    );
  });
});
