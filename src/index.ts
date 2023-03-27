// import { main } from "./ch02";
import { map } from "basic/ch03/higher-order-function";
import { myCart } from "basic/ch03";
import { cart } from "basic/ch03/cart";

// const array = [
//   {
//     id: 1,
//     name: "홍길동",
//   },
//   {
//     id: 2,
//     name: "김길동",
//   },
//   {
//     id: 3,
//     name: "이길동",
//   },
// ];

// console.time("performance");
// console.log(
//   map<{ id: number; name: string }, string>(array, (item, index) => {
//     console.log("index: ", index);
//     return item.name;
//   })
// );
// console.timeEnd("performance");

const { cartInfo, totalPriceInfo, totalCountInfo } = myCart(cart);
console.log(cartInfo, "\n", totalPriceInfo, "\n", totalCountInfo);
