export const isEmpty = (element: string | unknown) => {
  if (element === undefined || element === null) {
    return true;
  }

  if (element instanceof Array) {
    return !element.length;
  }
  if (typeof element === "string") {
    return !element;
  }
};

/**
 * Generate random id.
 * @returns
 */
export const randomId = (): number => {
  return Math.floor(Math.random() * Date.now());
};
