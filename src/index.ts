// import { main } from "./ch02";
import { calcList } from "./ch03";

import { map } from "ch03/higher-order-function";

const array = [
  {
    id: 1,
    name: "홍길동",
  },
  {
    id: 2,
    name: "김길동",
  },
  {
    id: 3,
    name: "이길동",
  },
];

console.time("performance");
console.log(
  map<{ id: number; name: string }, string>(array, (item, index) => {
    console.log("index: ", index);
    return item.name;
  })
);
console.timeEnd("performance");

calcList();
