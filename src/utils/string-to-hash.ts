export const stringToHashNumber = (inputString: string): number => {
  let hash = 0;

  if (inputString.length === 0) {
    return hash;
  }

  for (let index = 0; index < inputString.length; index++) {
    // Turn the character into its index
    const char = inputString.codePointAt(index) as number;

    // Create a hash by using bitwise operation
    hash = (hash << 5) - hash + char;

    // Convert hash to a 32-bit integer
    hash = Math.trunc(hash);
  }

  // Turn the hash number into an absolute value for convenience
  return Math.abs(hash);
}
