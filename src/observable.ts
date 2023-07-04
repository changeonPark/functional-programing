type Async<A> = (ret: (X: A) => void) => void

const resolve = <A>(a: A): Async<A> => {
  return (ret) => {
    ret(a)
  }
}

const flatMap = <A, B>(a: Async<A>, f: (x: A) => Async<B>): Async<B> => {
  return (ret) => {
    a((x) => {
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

const promiseF = (str: string): Promise<string> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('promiseF 1: ' + str)
    }, 500)

    setTimeout(() => {
      resolve('promiseF 2: ' + str)
    }, 1000)
  })

const asyncF =
  (str: string): Async<string> =>
  (ret) => {
    setTimeout(() => {
      ret('asyncF 1 :' + str)
    }, 500)

    setTimeout(() => {
      ret('asyncF 2 :' + str)
    }, 1000)
  }

const handleError = (e: unknown) => {
  console.log('handleError: ' + e)
}

const program = (s: boolean) => {
  console.log('program' + s)
}

export const main = () => {
  run(map(asyncF('test'), (x) => console.log(x)))
  promiseF('test').then((x) => console.log(x))

  console.log('End!')
}
