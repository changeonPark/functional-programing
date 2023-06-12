import * as O from './optional/option'

export const curry2 =
  <A, B, C>(f: (a: A, b: B) => C) =>
  (a: A) =>
  (b: B): C =>
    f(a, b)

export const flip =
  <A, B, C>(f: (a: A, b: B) => C) =>
  (b: B, a: A): C =>
    f(a, b)

// map :: (Array<A>, (A => B)) => Array<B>
export const map = <A, B>(array: Array<A>, f: (a: A) => B): Array<B> => {
  const result: Array<B> = []

  for (const value of array) {
    result.push(f(value))
  }

  return result
}

export default function main() {
  const numbers = [1, 2, 3]
  const isEven = (x: number) => x % 2 === 0

  console.log('normal map: ', map(numbers, isEven))

  // curried map :: Array<A> => ((A => B) => Array<B>)
  const curriedMap = curry2(map)

  console.log('curried map: ', curriedMap(numbers)(isEven))

  // map :: Array<A> ~> (A => B) => Array<B>
  console.log('array map method: ', numbers.map(isEven))

  const filpedMap = flip(map)
  console.log('filp map: ', filpedMap(isEven, numbers))

  // map_ :: (A => B) => Array<A> => Array<B>
  const map_ = curry2(flip(map))

  const mapIsEven = map_(isEven)
  console.log('mapIsEven: ', mapIsEven(numbers))

  const base = O.map(O.some(2), isEven)
  console.log('base: ', base)

  const flipBase = flip(O.map)(isEven, O.some(2))
  console.log('flipBase: ', flipBase)

  const curryFlipBase = curry2(flip(O.map))(isEven)(O.some(2))
  console.log('curryFlipBase:', curryFlipBase)

  const omap = curry2(flip(O.map))
  // optionIsEven :: Option<number> => Obtion<boolean>
  const optionIsEven = omap(isEven)

  console.log('optionIsEven: ', optionIsEven(O.some(2)))
  console.log('optionIsEven: ', optionIsEven(O.none()))
}
