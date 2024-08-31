import { deltaTime } from '../../src';

const TWO_HOURS_IN_MILLISECONDS = 2 * 3600 * 1000;

describe('getTimeConversion function', () => {
  it('should return a switched date two hours in past', () => {
    const now = new Date();
    const adjusted = deltaTime('BEFORE', now, 'HOUR', 2);

    expect(adjusted.getTime()).toBe(now.getTime() - TWO_HOURS_IN_MILLISECONDS);
  });

  it('should return a switched date two hours in future', () => {
    const now = new Date();
    const adjusted = deltaTime('AFTER', now, 'HOUR', 2);

    expect(adjusted.getTime()).toBe(now.getTime() + TWO_HOURS_IN_MILLISECONDS);
  });

  it('should throw an error on unrecognized direction', () => {
    const now = new Date();

    // @ts-expect-error Unrecognized direction
    expect(() => deltaTime('INVALID', now, 'HOUR', 2)).toThrow(
      `Unrecognized direction: 'INVALID' - allowed values are 'BEFORE' and 'AFTER'`,
    );
  });
});
