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
