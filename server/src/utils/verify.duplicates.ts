export const verifyArrayDuplicates = (array: any[]): boolean =>
  new Set(array).size < array.length
