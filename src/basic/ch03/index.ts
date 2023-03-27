import type { Item } from "./cart";

type Menu = {
  name: string;
  price: number;
  quantity: number;
};

const stockItem = (item: Item): Menu => {
  return {
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  };
};

const outOfStockItem = (item: Item): Menu => {
  return {
    name: `${item.name} (재고 없음)`,
    price: item.price,
    quantity: item.quantity,
  };
};

const item = (item: Item): Menu => {
  if (item.outOfStock) {
    return outOfStockItem(item);
  } else {
    return stockItem(item);
  }
};

const cart = (list: Array<Item>): Menu[] => {
  let result: Menu[] = [];

  for (let i = 0; i < list.length; i += 1) {
    result.push(item(list[i]));
  }

  return result;
};

const totalCalculator = (list: Array<Item>, getValue: (item: Item) => number) => {
  let total = 0;

  for (let i = 0; i < list.length; i += 1) {
    if (!list[i].outOfStock) {
      total += getValue(list[i]);
    }
  }

  return total;
};

const totalPrice = (list: Array<Item>): string => {
  let totalPrice = totalCalculator(list, item => item.price * item.quantity);

  return `총 금액: ${totalPrice}원`;
};

const totalCount = (list: Array<Item>): string => {
  let totalCount = totalCalculator(list, item => item.quantity);

  return `총 수량: ${totalCount}개`;
};

export const myCart = (list: Array<Item>) => {
  const cartInfo = cart(list);
  const totalPriceInfo = totalPrice(list);
  const totalCountInfo = totalCount(list);

  return { cartInfo, totalPriceInfo, totalCountInfo };
};
