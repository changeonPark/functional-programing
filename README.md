# functional-programing

## 관례

- 함수형 프로그래밍에서 인자로 받는 임의의 함수 명을 `f`로 사용한다.
- 추가적인 함수 인자를 표현할 때 알파벳 순으로 나열한다.
  - `g, h, i`
- 변수명은 주로 `x, y, z` 등을 사용 -> 수학 변수와 비슷하게 사용

## try catch

- 순수 함수가 아님
- `try catch`문의 `catch`와 `throw`도 side effect를 발생시키기 때문에 함수 합성 어려움

## 참조 투명성

> 표현식을 그것을 평가한 값으로 대체 혹은 반대로 값을 표현식으로 대체하더라도 프로그램의 동작이 변하지 않아야 함

**동일한 입력에 대한 표현식(expression)의 값을 항상 동일 및 해당 평가(evaluation)에 부수효과(side effect)가 없어야 한다**

![표현식(Expression)](/assets/image.png)

```js
// 참조가 투명한 경우
const w = 2
const x = 3
const y = w * x
const z = 3 - (y - y) + w // 5
// === 3 - ((w * x) - (w * x)) + w

/**
 * 참조가 불투명한 경우
 * 1. 콘솔이 찍히는 경우
 * 2. 전역 변수를 수정하는 경우
 * 3. 클래스의 값을 수정하는 경우
 * etc...
 **/
let n = 0
n = n + 1 // n = 1
n = n + 1 // n = 2
```

## Option VS Try

`Option<A>`: 에러가 발생했다는 사실만 중요할 때

`Try<E, R>`: **어떤 에러가 발생했는지** 그 내용도 중요할 때

> `Option`을 사용하는 곳에 `Try` 사용은 OK
>
> 정보가 많아지면 신경 써야할 것도 많아짐 ~> 상황에 맞게 필요한 만큼 사용

Try의 `Map || FlatMap`을 사용하는 경우

> 부수 효과가 동반되지 않는 인자를 사용하는 함수에 부수 효과가 포함된 타입의 인자를 사용할 경우

사용하려는 함수의 `Return Type`이 동일한 부수 효과를 발생하는 경우: **`FlatMap`**

## Asynchronous

### continuation-passing style -> CPS

- 결괏값을 인자로 전달 받은 **callback 함수**를 통해 전달
- 예외와 백트래킹, 스레드, 제네레이터(generator)등의 제어 구조를 추가할 수 있다
- 프로시저는 리턴 값으로 호출 가능한 콜백을 받는다.
- 컨티뉴에이션은 퍼스트-클래스 리턴 포인트(first-class return point)이다

### direct style

### Async FlatMap

```ts
const a = asnycA('hello')
const b = flatMap(a, (x) => asnycB(x))
```

위 코드의 동작 원리를 이해하기 위해 아래 작성됨

```ts
const asnycA =
  (str: string): Async<number> =>
  (ret) => {
    setTimeout(() => {
      console.log('call asyncA : ', str)
      ret(str.length * 2)
    }, 500)
  }
```

```ts
const flatMap = <A, B>(a: Async<A>, f: (a: A) => Async<B>): Async<B> => {
  return (ret) => {
    a((x) => {
      const b = f(x)
      b((y) => ret(y))
    })
  }
}
```

위 `asyncA`의 `ret` 함수는 `flatMap` 함수의 `a((x) => {...})`이 됨 ~> `x`의 값은 `str.length * 2`의 값인 10이 됨

### Promise

`Promise`는 선언과 동시에 호출도 실행(선언과 호출이 독립적임) <-> 위의 `Async`는 결과를 전달받을 `callback`이 없으면 실행 X

`callback`과 `then`에 순수 함수 및 참조 투명성을 지키며 작성한다면, `Promise`에 대한 사용이 좀 더 쉬워질 것으로 보임

### 서술과 실행

- 서술: `표현식`처럼 무엇을 할 것인가 나타내는 것
- 실행: 계산을 실행해 결과값을 도출

실행을 미룰 수 있는 것: Lazyness ~> 함수 생성

함수 생성: 계산을 서술 ~> 함수로 만들어도 값으로 바로 평가되는 것이 아닌 호출 이후에 값으로 평가 되는 것

## Observable

값을 한 번만 전달하는 `Promise`와 달리 여러번 전달할 수 있음 ~> `resolve`나 `reject` 호출 이후 추가적인 호출은 전달되지 않음

`type Observer<T> = (v: T) => void`: 비동기로 발생하는 값을 구독하기 위해 외부에서 전달하는 함수

`type Observable<T> => (o: Observer<T>) => void`: 값이 생성되는 비동기 작업에 Observer 전달, 비동기 작업을 실행하는 함수

> `RxJS`에서는 class로 지정되어 있는 듯

`Observer<B> => Observer<A>` ~> **lift** ~> `Observable<A> => Observable<B>`

![Observable Merge](/assets/observable-merge.png)

## Iterator, Iterable, Generator

Iterable은 '반복 가능한'이라는 의미로, 반복 가능한 객체를 나타냄

이는 객체가 [Symbol.iterator] 메소드를 가지고 있으면 그 객체를 '반복 가능한' 객체라고 부름

이 메소드는 iterator를 반환해야 하며, 이 iterator는 next 메소드를 가지고 있음

이 next 메소드를 통해 반복할 수 있는 값들을 순차적으로 얻을 수 있음

자바스크립트에서는 배열(Array)이 대표적인 iterable 객체, 배열의 요소들을 순회하거나, 반복하는 것이 가능하기 때문

---

`Generator`는 특별한 종류의 함수로, 그 이름 그대로 '생성자'라는 의미

generator는 일반 함수와 다르게 함수의 실행을 중간에 멈추고 다시 시작할 수 있는 기능 보유

이는 'yield'라는 키워드를 통해 가능, 이 키워드를 통해 함수의 실행을 일시 중지 및 필요할 때 다시 재개할 수 있음

또한 generator는 호출할 때마다 `iterable`한 객체를 반환, 이를 통해 순회하거나 반복하는 것이 가능

따라서 generator는 큰 데이터 집합을 효율적으로 처리할 수 있는 도구로 자주 사용

**js**

```js
function* numberGenerator(start, end) {
  let current = start
  while (current <= end) {
    yield current++
  }
}

const numbers = numberGenerator(1, 5)
for (let number of numbers) {
  console.log(number) // 1, 2, 3, 4, 5 순서로 출력됩니다.
}
```

**react**

```jsx
import React, { useState, useEffect, useMemo } from 'react'

async function* fetchPage(pageSize) {
  let page = 1
  while (true) {
    const response = await fetch(`/api/todos?page=${page}&size=${pageSize}`)
    const data = await response.json()
    if (data.length === 0) break
    yield data
    page += 1
  }
}

function TodoList() {
  const [todos, setTodos] = useState([])
  const [error, setError] = useState(null)
  const pages = useMemo(() => fetchPage(10), []) //Generator Prepare

  useEffect(() => {
    const loadMore = async () => {
      try {
        const next = await pages.next() // Generator Excute
        if (!next.done) {
          const newTodos = next.value
          setTodos((oldTodos) => [...oldTodos, ...newTodos])
        }
      } catch (e) {
        setError(e.message)
      }
    }

    loadMore()
  }, [pages]) // depend on pages

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  )
}

export default TodoList
```
