/**
 * Tries to parse the given value while treating it as URI Component.
 *
 * @param {string} value String value to be parsed
 *
 * @returns {unknown} Parsed value; whether it's a string, number,
 * array or object.
 */
const parseValue = (value: string): unknown => {
  try {
    return JSON.parse(decodeURIComponent(value));
  } catch {
    if (!Number.isNaN(Number(value))) {
      return Number(value);
    }

    return decodeURIComponent(value);
  }
};

/**
 * Tries to parse the given configuration string in a form of URL query
 * parameters into a configuration object.
 *
 * E.g. string `int=6&str=asdf&arr=0&arr=1` is expected to be parsed into:
 * ```
 * {
 *   int: 6,
 *   str: "asdf",
 *   arr: [0, 1]
 * }
 * ```
 *
 * @param {string} configString Configuration string to be parsed into an object
 *
 * @returns {Record<string, unknown>} Configuration object being created from
 * the given configuration string in a form of URL query parameters
 */
export const parseConfigString = (
  configString: string,
): Record<string, unknown> => {
  const result: Record<string, unknown> = {};

  for (const parameter of configString.split('&')) {
    const [key, value] = parameter.split('=');
    const parsedValue = value === undefined ? undefined : parseValue(value);

    // When key already exists, convert to array or append to an existing array
    if (!!key && key in result) {
      if (Array.isArray(result[key])) {
        result[key].push(parsedValue);
      } else {
        result[key] = [result[key], parsedValue];
      }
    } else if (key) {
      result[key] = parsedValue;
    }
  }

  return result;
};
