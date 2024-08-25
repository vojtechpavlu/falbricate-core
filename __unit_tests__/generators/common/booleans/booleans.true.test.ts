import { constantTrue } from '../../../../src';

describe('constantTrue Value Generator', () => {
  it('should always return a true value', () => {
    const valueGenerator = constantTrue({});

    expect(valueGenerator({ randomizer: Math.random })).toBe(true);
  });
});
