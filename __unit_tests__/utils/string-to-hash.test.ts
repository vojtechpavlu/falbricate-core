import { stringToHashNumber } from '../../src';

describe('stringToHashNumber utility function', () => {
  it('should generate an integer number from the string', () => {
    const hash = stringToHashNumber('some string');

    // Expect the result is a number
    expect(typeof hash === 'number').toBe(true);

    // Expect the result is a finite number
    expect(Number.isFinite(hash)).toBe(true);

    // Expect the result is an integer
    expect(Number.isInteger(hash)).toBe(true);

    // Expect the result is a safe integer
    expect(Number.isSafeInteger(hash)).toBe(true);
  });

  it('should generate always the same number for the same input', () => {
    const hash1 = stringToHashNumber('some string');
    const hash2 = stringToHashNumber('some string');

    expect(hash1 === hash2).toBe(true);
  });

  it('should return 0 for empty input string', () => {
    const hash = stringToHashNumber('');
    expect(hash).toBe(0);
  });
});
