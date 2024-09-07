import { Randomizer } from '../randomizer';
import { pickRandomItem } from './random';

type DefaultSubstitute = (randomizer: Randomizer) => string;
type Variables = { [key: string]: unknown };

const defaults: { [key: string]: DefaultSubstitute } = {
  /* Digits with zero */
  $d: (r: Randomizer) => pickRandomItem(r, [...'0123456789']),

  /* Digits without zero */
  $D: (r: Randomizer) => pickRandomItem(r, [...'123456789']),

  /* Lowercase characters */
  $c: (r: Randomizer) => pickRandomItem(r, [...'abcdefghijklmnopqrstuvwxyz']),

  /* Uppercase characters */
  $C: (r: Randomizer) => pickRandomItem(r, [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']),

  /* Lowercase alphanumerics */
  $a: (r: Randomizer) =>
    pickRandomItem(r, [...'0123456789abcdefghijklmnopqrstuvwxyz']),

  /* Uppercase alphanumerics */
  $A: (r: Randomizer) =>
    pickRandomItem(r, [...'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ']),

  /* Lowercase hexadecimals */
  $h: (r: Randomizer) => pickRandomItem(r, [...'0123456789abcdef']),

  /* Uppercase hexadecimals */
  $H: (r: Randomizer) => pickRandomItem(r, [...'0123456789ABCDEF']),
};

export const stringTemplate = (
  template: string,
  randomizer: Randomizer,
  variables?: Variables
) => {
  let result = template + '';

  // Replace defaults
  for (const key of Object.keys(defaults)) {
    const substitute = defaults[key] as DefaultSubstitute;
    while (result.includes(key)) {
      result = result.replace(key, substitute(randomizer));
    }
  }

  // Replace variables
  for (const key of Object.keys(variables ?? {})) {
    const substitute = (variables as Variables)[key] as unknown;
    while (result.includes(key)) {
      result = result.replace(key, substitute + '');
    }
  }

  return result;
};
