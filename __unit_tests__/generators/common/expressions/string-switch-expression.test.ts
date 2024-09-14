import { getDefaultEcosystem, stringSwitchExpression } from '../../../../src';

const randomizer = Math.random;
const ecosystem = getDefaultEcosystem();

// Always provide a constant value 'a'
const value = '!const-a';

// When the value is 'a' (always), then return a boolean true
const handlers = { a: 'true' };

describe('String switch expression generator', () => {
  it('should generate an expected value', () => {
    const expression = stringSwitchExpression({ handlers, ecosystem, value });
    expect(expression({ randomizer })).toBe(true);
  });

  it('should generate a default value when nothing matches', () => {
    const expression = stringSwitchExpression({
      handlers,
      ecosystem,

      // A value that does not match any handler
      value: '!const-not-matching-value',

      // A default value returned when no matcher corresponds
      default: '!const-default',
    });

    expect(expression({ randomizer })).toBe('default');
  });

  it('should throw on empty ecosystem', () => {
    expect(() => stringSwitchExpression({ handlers, value })).toThrow(
      `Can't handle the string switch expression - 'ecosystem' property is required`,
    );
  });

  it('should throw on empty handlers object', () => {
    expect(() =>
      stringSwitchExpression({ handlers: {}, ecosystem, value }),
    ).toThrow(
      `Can't handle the string switch expression - no handlers specified`,
    );
  });

  it('should throw on empty value', () => {
    expect(() => stringSwitchExpression({ handlers, ecosystem })).toThrow(
      `Can't handle the string switch expression - 'value' property is required`,
    );
  });
});
