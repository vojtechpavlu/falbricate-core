import { nullGenerator } from '../../../../src';

const randomizer = Math.random;

describe('Null value generator', () => {
  it('should generate null', () => {
    const generator = nullGenerator({});
    expect(generator({ randomizer })).toBeNull();
  });
});
