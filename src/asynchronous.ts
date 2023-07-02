const id = <A>(a: A): A => {
  return a
}

const cpsId = <A>(a: A, ret: (a: A) => void) => {
  ret(a)
}

// callback hell test code
const a = (str: string, ret: (x: number) => void) => {
  setTimeout(() => {
    console.log('call a : ', str)
    ret(str.length * 2)
  }, 500)
}

const b = (str: string, ret: (x: number) => void) => {
  setTimeout(() => {
    console.log('call b : ', str)
    ret(str.length * 3)
  }, 500)
}

const c = (str: string, ret: (x: number) => void) => {
  setTimeout(() => {
    console.log('call c : ', str)
    ret(str.length * 20)
  }, 500)
}

// Option<A> = None | Some<A>
// Try<E, A> = Failed<E> | Success<A>

type Async<A> = (ret: (X: A) => void) => void

const resolve = <A>(a: A): Async<A> => {
  return (ret) => {
    ret(a)
  }
}

// Monad 구현 예제, callback으로 결과를 반환하는 특징.
// https://chat.openai.com/share/e7e7660a-8272-4ea2-996d-1bdd73246bb6
const flatMap = <A, B>(a: Async<A>, f: (x: A) => Async<B>): Async<B> => {
  return (ret) => {
    console.log('faltMpa ret: ', ret.toString())
    a((x) => {
      console.log('faltMpa x: ', x)
      const b = f(x)
      b((y) => ret(y))
    })
  }
}

const map = <A, B>(a: Async<A>, f: (a: A) => B): Async<B> => {
  return flatMap(a, (x) => resolve(f(x)))
}

const run = <A>(a: Async<A>) => {
  a(() => {})
}

const asnycA =
  (str: string): Async<number> =>
  (ret) => {
    console.log('asyncA Ret', ret.toString())
    setTimeout(() => {
      console.log('call asyncA : ', str)
      ret(str.length * 2)
    }, 500)
  }

const asnycB =
  (num: number): Async<number> =>
  (ret) => {
    setTimeout(() => {
      console.log('call asyncB : ', num)
      ret(num * 2)
    }, 500)
  }

const asnycC =
  (num: number): Async<number> =>
  (ret) => {
    setTimeout(() => {
      console.log('call asyncC : ', num)
      ret(num * 2)
    }, 500)
  }

export const main = () => {
  // // direct style
  // const a = id('test')
  // console.log(a)

  // // continuation-passing style
  // const b = cpsId('test', (x) => {
  //   console.log(x + ' cps')
  // })

  // callback hell
  // a('hello', (x) => {
  //   b('hello2', (y) => {
  //     c('hello3', (z) => {
  //       console.log(z)
  //     })
  //   })
  // })

  // Async Map, faltMap -> callback hell 탈출
  const a = asnycA('hello')
  const b = flatMap(a, (x) => asnycB(x))
  console.log(
    'clg: ',
    b((x) => console.log('oh: ', x))
  )
  const c = flatMap(b, (x) => asnycC(x))

  // const result = flatMap(c, (x) => resolve(console.log('result: ', x)))
  const result = map(c, (x) => console.log('result: ', x))
  run(result)
}
