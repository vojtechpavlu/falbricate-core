import { parseToDesiredFormat } from '../../src';

describe('parseToDesiredFormat function', () => {
  it('should return the expected value', () => {
    const timestamp: number = 953_039_515_000;
    const parsed = parseToDesiredFormat(timestamp, 'isoDatetime');

    expect(parsed).toBe(new Date(timestamp).toISOString());
  });

  it('should throw on unrecognized type', () => {
    const timestamp: number = 953_039_515_000;

    // @ts-expect-error Unrecognized type
    expect(() => parseToDesiredFormat(timestamp, 'not-recognized')).toThrow(
      `Unrecognized option for processing timestamp into format 'not-recognized'. ` +
        `Use some of these: date, isoDatetime, isoDate, isoTime, timestamp`,
    );
  });
});
