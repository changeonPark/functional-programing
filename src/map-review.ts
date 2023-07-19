import * as O from './optional/option'

const compose =
  <B, C>(g: (b: B) => C) =>
  <A>(f: (a: A) => B) =>
  (a: A): C =>
    g(f(a))

const getLength = (s: string): number => {
  return s.length
}

const isEven = (n: number): boolean => {
  return n % 2 === 0
}

const apply =
  <A, B>(f: (a: A) => B) =>
  (a: A): B =>
    f(a)

const x = 3

const x2 = apply(isEven)(x)

const anotherIsEven = apply(isEven)
const anotherGetLength = apply(getLength)

const f1 = apply(compose(isEven)(getLength))
const f2 = compose(apply(isEven))(apply(getLength))

const optionIsEven = O.map(isEven)
const optionGetLength = O.map(getLength)

// of1과 of2를 같도록 구현하는 것은 map을 구현하는 개발자의 몫
// 자유로운 합성을 위해서는 구조를 보존하는 함수여야 한다
const of1 = O.map(compose(isEven)(getLength))
const of2 = compose(O.map(isEven))(O.map(getLength))

type Iterator<A> = () => A
type Observer<A> = (a: A) => void
type Function<A, B> = (a: A) => B

const map =
  <A, B>(f: (a: A) => B) =>
  <R>(input: Function<R, A>): Function<R, B> => {
    return (r) => {
      return f(input(r))
    }
  }

const mapIsEven = map(isEven)
const c1 = mapIsEven(getLength)

// 입력 타입에 대한 map 함수
// pipe와 유사함
const contraMap =
  <A, B>(f: (a: A) => B) =>
  <R>(input: Function<B, R>): Function<A, R> => {
    return (a) => {
      return input(f(a))
    }
  }

const contraMapGetLength = contraMap(getLength)

export const main = () => {}
