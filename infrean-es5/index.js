// 순수 함수
function add(a, b) {
  return a + b
}

// 순수 함수가 아닌 경우
let c = 20

function add2(a, b) {
  // c의 값이 바뀌면 input이 같아도 결과가 바뀜
  return a + b + c
}

function add3(a, b) {
  // 외부의 값을 변경(부수 효과 발생)
  c = b
  return a + b
}

let obj1 = { val: 10 }
function add4(obj, b) {
  // 외부 obj1 변수를 인자로 받아 값으 변경시켜버림 => 부수 효과
  obj.val += b
}
console.log(obj1.val)
add4(obj1, 20)
console.log(obj1.val)

// 다시 순수 함수
let obj2 = { val: 10 }
function add5(obj, b) {
  // obj2를 참조한 할 뿐 값을 변경하지 않음
  // 새로운 객체를 return
  return { val: obj.val + b }
}
console.log(obj2.val)
const result = add5(obj2, 20)
console.log('result : ', result)
console.log(obj2.val)
