import { constantFalse } from '../../../../src';

describe('constantFalse Value Generator', () => {
  it('should always return a false value', () => {
    const valueGenerator = constantFalse({});

    expect(valueGenerator({ randomizer: Math.random })).toBe(false);
  });
});
