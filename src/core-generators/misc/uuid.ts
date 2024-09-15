import {
  GenerationContext,
  ValueGenerator,
  ValueGeneratorConfiguration,
  ValueGeneratorFactory,
} from '../../generators';
import { stringTemplate } from '../../utils';

/** Lowercase template */
const LC_TEMPLATE =
  '$h$h$h$h$h$h$h$h-$h$h$h$h-{ver}$h$h$h-$h$h$h$h-$h$h$h$h$h$h$h$h$h$h$h$h';

/** Uppercase template */
const UC_TEMPLATE =
  '$H$H$H$H$H$H$H$H-$H$H$H$H-{ver}$H$H$H-$H$H$H$H-$H$H$H$H$H$H$H$H$H$H$H$H';

/**
 * Generator of UUIDs (Universally unique identifiers) in its general form.
 *
 * @param {ValueGeneratorConfiguration} config Configuration consisting of
 * optional fields:
 * - `version` - represents UUID version (allowed values: `3`, `4` or `5`)
 * - `uppercase` - boolean value whether the ID should be in uppercase or
 * lowercase characters
 *
 * @returns {ValueGenerator} Value generator being able to generate such UUIDs
 *
 * @throws {Error} When the desired version is not between the allowed ones.
 */
export const uuidGenerator: ValueGeneratorFactory = (
  config: ValueGeneratorConfiguration,
): ValueGenerator => {
  const uppercase = (config.uppercase ?? false) as boolean;
  const version = (config.version ?? '4') as string;
  const template = uppercase ? UC_TEMPLATE : LC_TEMPLATE;

  // When unexpected uuid version number
  if (!['3', '4', '5'].includes(version + '')) {
    throw new Error(
      `Can't generate a uuid - unrecognized version (${version}) - only allowed are [3, 4, 5]`,
    );
  }

  return (context: GenerationContext) =>
    stringTemplate(template, context.randomizer, { '{ver}': () => version });
};
