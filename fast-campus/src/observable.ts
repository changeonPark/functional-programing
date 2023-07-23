import { Observable, interval, take } from 'rxjs'

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

// export const main = () => {
//   run(map(asyncF('test'), (x) => console.log(x)))
//   promiseF('test').then((x) => console.log(x))

//   console.log('End!')
// }

// advanced

const integers = (n: number): Array<number> => {
  const ret: Array<number> = []

  let i = 0

  while (i < n) {
    i += 1
    ret.push(i)
  }

  return ret
}

type Iterator<A> = () => A
// 값을 return => return의 연속
type Iterable<A> = () => Iterator<A>
type Observer<A> = (a: A) => void
// 값을 input => input의 연속
// type Observable<A> = (subscribe: Observer<A>) => void

const integerGenerator = () => {
  let i = 0

  return () => {
    i += 1
    return i
  }
}

// 비동기 코드여도 내부에는 동기적 코드가 섞여있는 경우가 많음
// 동기적인 코드는 별도의 함수로 분리해 비동기 내부에서 합성해 단순한 흐름의 코드 작성 가능
const promiseIntegers = (n: number): Promise<Array<number>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(integers(n))
    }, 1000)
  })

// Obersver Pattern 사용된 함수
// Observer 패턴은 객체의 상태가 변경될 때마다 모든 의존성이 알림을 받고 자동으로 업데이트되는 방식
// Subject(timerId) = 주기적으로 새로운 값을 생성하고, 이를 ret에 전달하는 역할
// Observer(ret) = 전달된 값을 처리하는 역할
// "Emit 한다"는 주로 이벤트 드리븐 프로그래밍 또는 반응형 프로그래밍에서 사용되며, 특정 객체나 구조가 이벤트 또는 값을 "발산" 또는 "발출"한다는 의미
// 또한, 그 값을 외부로 보내서 다른 코드에서 그 값을 이용할 수 있도록 하는 것을 의미
/*
const integerObservable: Async<number> = (ret) => {
  const iter = integerGenerator()

  const timerId = setInterval(() => {
    const result = iter()
    // result 값(증가하는 숫자)을 emit한다
    ret(result)

    if (result >= 5) {
      console.log('end!')
      clearInterval(timerId)
    }
  }, 1000)
}
*/

const integerObservable: Observable<number> = new Observable((subscriber) => {
  const iter = integerGenerator()
  let result

  const subscription = interval(1000).subscribe(() => {
    result = iter()
    subscriber.next(result)

    if (result >= 5) {
      console.log('end!')
      // 옵저버블을 완료하는 역할 ~> 더 이상 값을 방출하지 않음
      // 옵저버블의 complete 콜백이 호출되고, 이후에는 next 콜백이 호출되지 않음
      // 주로 옵저버블이 성공적으로 완료되었음을 알리고자 할 때 사용
      subscriber.complete()
    }
  })

  // cleanup
  return () => {
    console.log('cleanup')
    // 구독을 취소하고 해당 구독과 관련된 리소스를 정리하는 역할
    // 구독을 취소하면 옵저버블은 더 이상 값을 방출하지 않음
    // 특정 조건이 충족되면 구독을 취소하고 싶을 때 호출해 구독을 정리함
    subscription.unsubscribe()
  }
})

const onManyIntegers = (n: number) => {
  const arr = integers(n)

  console.log(arr)
}

const iter = integerGenerator()

const onStep = () => {
  const n = iter()
  console.log(n)
}

export const main = () => {
  // onStep()
  // onStep()
  // promiseIntegers(5).then((x) => console.log(x))

  // integerObservable((n) => console.log(n))

  // pipe
  integerObservable.pipe(take(10)).subscribe({
    next: (x) => {
      console.log(x)
    },
  })

  // currying
  // take(10)(integerObservable).subscribe({
  //   next: (x) => {
  //     console.log(x)
  //   },
  // })
}
