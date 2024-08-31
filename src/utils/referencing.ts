type Referencable = Record<string, unknown>;

export const reference = (
  object: Referencable,
  path: string,
  onEmptyThrow: boolean = true,
  separator: string = '.'
): unknown => {
  if (!object) {
    if (onEmptyThrow) {
      throw new Error(`Can't reference - Object not defined`);
    } else {
      return undefined;
    }
  }

  const splitPath = path.split(separator);

  if (splitPath.length === 1) {
    return object[splitPath[0] as string];
  } else if (splitPath.length > 1) {
    // More item specified in path
    return reference(
      // Use the nested object
      object[splitPath[0] as string] as Referencable,

      // Use the rest of the path
      splitPath.slice(1).join(separator),

      // Use default values
      onEmptyThrow,
      separator
    );
  } else {
    throw new Error(`Can't reference - Not suitable path '${path}'`)
  }
}
