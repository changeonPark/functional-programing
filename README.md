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

- 예외와 백트래킹, 스레드, 제네레이터(generator)등의 제어 구조를 추가할 수 있다
- 프로시저는 리턴 값으로 호출 가능한 콜백을 받는다.
- 컨티뉴에이션은 퍼스트-클래스 리턴 포인트(first-class return point)이다

### direct style