import { undefinedGenerator } from '../../../../src';

const randomizer = Math.random;

describe('Undefined value generator', () => {
  it('should generate undefined', () => {
    const generator = undefinedGenerator({});
    expect(generator({ randomizer })).toBeUndefined();
  });
});
