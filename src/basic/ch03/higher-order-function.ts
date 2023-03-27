export const map = <A, B>(array: Array<A>, f: (a: A, index?: number) => B): Array<B> => {
  const result: Array<B> = [];

  const indexes = array.entries();

  for (const [index, value] of indexes) {
    result.push(f(value, index));
  }

  return result;
};
