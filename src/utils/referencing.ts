/** Type of entities that can be referenced within */
type Referencable = Record<string, unknown>;

/**
 * Function to reference in an {@link Referencable} contents.
 *
 * @param {Referencable} referencable Entity this function will drill down in
 * @param {string} path Path through the given referencable
 * @param {boolean} onEmptyThrow Whether the function should overcome
 * Null-pointer issues by returning `undefined` or to throw corresponding exception
 * @param {string} separator Separator to be used; by default it's a dot (`.`) operator
 *
 * @returns {unknown} Value stored on the specified path within the given referencable
 */
export const reference = (
  referencable: Referencable,
  path: string,
  onEmptyThrow: boolean = true,
  separator: string = '.',
): unknown => {
  if (!referencable) {
    if (onEmptyThrow) {
      throw new Error(`Can't reference - Object not defined`);
    } else {
      return undefined;
    }
  }

  const splitPath = path.split(separator);

  if (splitPath.length === 1) {
    return referencable[splitPath[0] as string];
  } else if (splitPath.length > 1) {
    // More item specified in path
    return reference(
      // Use the nested object
      referencable[splitPath[0] as string] as Referencable,

      // Use the rest of the path
      splitPath.slice(1).join(separator),

      // Use default values
      onEmptyThrow,
      separator,
    );
  } else {
    throw new Error(`Can't reference - Not suitable path '${path}'`);
  }
};
