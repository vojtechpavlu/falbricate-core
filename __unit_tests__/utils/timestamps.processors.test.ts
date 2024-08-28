import { getTimestampProcessor } from '../../src';

describe('Timestamp processors', () => {
  const timestamp: number = 953_039_515_000;

  describe('date', () => {
    it('should return a date', () => {
      const processor = getTimestampProcessor('date');
      expect(processor(timestamp)).toBeInstanceOf(Date);
    });
  });

  describe('isoDatetime', () => {
    it('should return a string', () => {
      const processor = getTimestampProcessor('isoDatetime');
      expect(typeof processor(timestamp)).toBe('string');
    });
  });

  describe('isoDate', () => {
    it('should return a string', () => {
      const processor = getTimestampProcessor('isoDate');
      expect(typeof processor(timestamp)).toBe('string');
    });

    it('should return an expected value', () => {
      const processor = getTimestampProcessor('isoDate');
      expect(processor(timestamp)).toBe('2000-03-14');
    });
  });

  describe('isoTime', () => {
    it('should return a string', () => {
      const processor = getTimestampProcessor('isoTime');
      expect(typeof processor(timestamp)).toBe('string');
    });

    it('should return an expected value', () => {
      const processor = getTimestampProcessor('isoTime');
      expect(processor(timestamp)).toBe('13:11:55.000');
    });
  });

  describe('timestamp', () => {
    it('should return a number', () => {
      const processor = getTimestampProcessor('timestamp');
      expect(typeof processor(timestamp)).toBe('number');
    });

    it('should return an expected value', () => {
      const processor = getTimestampProcessor('timestamp');
      expect(processor(timestamp)).toBe(timestamp);
    });
  });
});
