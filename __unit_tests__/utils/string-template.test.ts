import { stringTemplate } from '../../src';

const randomizer = Math.random;

describe('string template', () => {
  it('should generate a string', () => {
    const template = '$d$d$d';
    expect(typeof stringTemplate(template, randomizer)).toBe('string');
  });

  it('should use the defaults substitutes', () => {
    const template = '$d$d$d';
    expect(stringTemplate(template, randomizer)).toMatch(/^\d{3}$/);
  });

  it('should use the variable substitutes', () => {
    const template = 'PREFIX-#-#';
    expect(stringTemplate(template, randomizer, { '#': () => 'value' })).toBe(
      'PREFIX-value-value',
    );
  });

  it('should be able to mix up the substitutes', () => {
    const template = '#-@-$d-$C';

    const variables = {
      '#': () => 'hash',
      '@': () => 'at',
    };

    expect(stringTemplate(template, randomizer, variables)).toMatch(
      /^hash-at-\d-[A-Z]$/,
    );
  });

  it('should call variable function multiple times', () => {
    const template = '######';

    let index = 0;

    const variables = {
      '#': () => {
        index += 1;
        return index;
      },
    };

    const processed = stringTemplate(template, randomizer, variables);

    // eslint-disable-next-line unicorn/no-array-for-each
    [...processed].forEach((item, index, array) => {
      if (index < array.length - 1) {
        expect(Number.parseInt(item) + 1).toBe(
          Number.parseInt(array[index + 1] as string),
        );
      }
    });
  });
});
