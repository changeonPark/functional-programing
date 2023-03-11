export const isExpensive = (price: number | undefined): boolean => {
  if (price === undefined) {
    return false;
  }
  return price > 100;
};
