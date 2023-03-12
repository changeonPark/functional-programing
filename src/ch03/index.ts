import { cart } from "./cart";

type Keys = "name" | "price" | "quantity" | "outOfStock";

type Menu = {
  list: Array<Record<Keys, string | boolean | number>>;
  totalCount: number;
  totalPrice: number;
};

export const calcList = () => {
  let menu: Menu = {
    list: [],
    totalCount: 0,
    totalPrice: 0,
  };

  for (let i = 0; i < cart.length; i += 1) {
    if (cart[i].outOfStock) {
      menu.list.push({
        name: `${cart[i].name} (재고 없음)`,
        price: cart[i].price,
        quantity: cart[i].quantity,
        outOfStock: cart[i].outOfStock,
      });
      continue;
    }

    menu.list.push({
      name: cart[i].name,
      price: cart[i].price,
      quantity: cart[i].quantity,
      outOfStock: cart[i].outOfStock,
    });
  }

  for (let i = 0; i < cart.length; i += 1) {
    if (!cart[i].outOfStock) menu.totalCount += cart[i].quantity;
  }

  for (let i = 0; i < cart.length; i += 1) {
    if (!cart[i].outOfStock) menu.totalPrice += cart[i].quantity * cart[i].price;
  }

  console.log(menu);
};
