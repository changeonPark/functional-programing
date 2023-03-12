import { cart, Item } from "./cart";

type MyItem = Pick<Item, "name" | "price" | "quantity">;

export const calcList = () => {
  const list: MyItem[] = [];

  let totalCount: number = 0;
  let totalPrice: number = 0;

  for (let i = 0; i < cart.length; i += 1) {
    list.push({ name: cart[i].name, price: cart[i].price, quantity: cart[i].quantity });

    totalCount += cart[i].quantity;
    totalPrice += cart[i].quantity * cart[i].price;
  }

  console.log(list, "\n총 합: ", `${totalCount} 상자`, "\n총 금액: ", `${totalPrice}원`);
};
