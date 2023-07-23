type Observer<A> = (a: A) => void
type Observable<A> = (subscribe: Observer<A>) => void

const pipeFunctions =
  <A, B, C>(f: (a: A) => B, g: (b: B) => C) =>
  (a: A): C => {
    return g(f(a))
  }

// asynchronous.ts의 faltMap 함수와 형태가 매우 유사함
// source Observable에서 값을 받으면, 해당 값을 f 함수에 적용하여 변환한 후, 변환된 값을 다시 subscribe 함수로 전달
const map =
  <A, B>(f: (a: A) => B) =>
  (source: Observable<A>): Observable<B> => {
    return (subscribe) => {
      source((a) => {
        const b = f(a)
        subscribe(b)
      })
    }
  }

// map :: (A => B) => Array<A> => Array<B>
// mapObserver :: (A => B) => Observer<B> => Observer<A>
// TODO: 공변성, 반공변성 알아보기
// f 함수를 활용하여 subscribe 함수에 전달되는 값 a를 변환하는 옵저버를 반환
const mapObserver =
  <A, B>(f: (a: A) => B) =>
  (subscribe: Observer<B>): Observer<A> => {
    return (a) => {
      subscribe(f(a))
    }
  }

const filter =
  <A>(pred: (a: A) => boolean) =>
  (source: Observable<A>): Observable<A> => {
    return (subscribe) => {
      source((a) => {
        if (pred(a)) {
          subscribe(a)
        }
      })
    }
  }

const filterObserver =
  <A>(pred: (a: A) => boolean) =>
  (subscribe: Observer<A>): Observer<A> => {
    return (a) => {
      if (pred(a)) {
        subscribe(a)
      }
    }
  }

// map :: (A => B) => Observable<A> => Observable<B>
// lift :: (Observer<A> => Observer<B>) => Observable<A> => Observable<B>
const lift =
  <A, B>(f: (b: Observer<B>) => Observer<A>) =>
  (source: Observable<A>): Observable<B> => {
    return (subscribe) => {
      source(f(subscribe))
    }
  }

// const liftedMap = <A, B>(f: (a: A) => B) => lift(mapObserver(f))
const liftedMap = pipeFunctions(mapObserver, lift)
const liftedFilter = pipeFunctions(filterObserver, lift)

export const main = () => {}
