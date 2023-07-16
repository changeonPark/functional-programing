type Observer<A> = (a: A) => void
type Observable<A> = (subscribe: Observer<A>) => void

const pipeFunctions =
  <A, B, C>(f: (a: A) => B, g: (b: B) => C) =>
  (a: A): C => {
    return g(f(a))
  }

// asynchronous.ts의 faltMap 함수와 형태가 매우 유사함
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

export const main = () => {}
