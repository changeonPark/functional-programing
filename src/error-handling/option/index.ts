import type { Item } from "./cart";

type Menu = {
  name: string;
  price: number;
  quantity: number;
};

const stockItem = (item: Item): Menu => {
  return {
    name: `${item.name}${item.discountPrice ? ` 할인쿠폰: ${item.discountPrice}원` : ""}`,
    price: item.discountPrice ? item.price - item.discountPrice : item.price,
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
  return (
    list
      //1. 목록에 있는 아이템 배열로 만들기
      .map(item)
  );
};

const totalCalculator = (list: Array<Item>, getValue: (item: Item) => number) => {
  return (
    list
      // 1. 재고가 있는 상품만 분류
      .filter(item => item.outOfStock === false)
      // 2. 분류된 상품등레 대해서 getValue 실행
      .map(getValue)
      // 3. getValue로 반환받은 값 모두 더하기
      .reduce((total, value) => total + value, 0)
  );
};

const totalPrice = (list: Array<Item>): string => {
  const totalPrice = totalCalculator(list, item => item.price * item.quantity);
  const totalDiscountPrice = totalCalculator(list, item =>
    item.discountPrice ? item.discountPrice * item.quantity : 0
  );

  return `총 금액: ${totalPrice - totalDiscountPrice}원(총 ${totalDiscountPrice}원 할인)`;
};

const totalCount = (list: Array<Item>): string => {
  const totalCount = totalCalculator(list, item => item.quantity);

  return `총 수량: ${totalCount}개`;
};

export const myCart = (list: Array<Item>) => {
  const cartInfo = cart(list);
  const totalPriceInfo = totalPrice(list);
  const totalCountInfo = totalCount(list);

  return { cartInfo, totalPriceInfo, totalCountInfo };
};
