/**
 * 임의의 함수: f
 * 더 많은 함수가 필요: 알파벳 순서대로 ex)g, h, i
 * 변수명: x, y, z
 * 관례임.
 */
const compose =
  <X, Y, R>(g: (y: Y) => R, f: (s: X) => Y) =>
  (x: X): R => {
    return g(f(x))
  }

function getPrice(name: string): number | undefined {
  if (name === 'tomato') {
    return 7000
  } else if (name === 'orange') {
    return 15000
  } else if (name === 'apple') {
    return 10000
  }
}

const isExpensive = (price: number | undefined): boolean => {
  if (price === undefined) {
    return false
  }
  return price > 10000
}

// function isExpensivePrice(name: string): boolean {
//   return isExpensive(getPrice(name))
// }
// const isExpensivePrice = compose(isExpensive, getPrice)

const test = compose<string, number | undefined, boolean>(isExpensive, getPrice)('tomato')

export const main = () => {
  return test
}
