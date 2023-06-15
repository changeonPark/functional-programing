import { Try, failure, getOrElse, isFailure, isSuccess, success } from 'try.types'
import { cart, Item } from 'optional/cart'

const tenDivideBy = (n: number): number => {
  if (n === 0) {
    throw new Error('Cannot divide by zero')
  }
  return 10 / n
}

const test = () => {
  /**
   * try-catch 안에서 실행하는지 밖에서 실행하는지에 따라 결과가 달라짐 ~> 참조 불투명
   */
  // const y = tenDivideBy(0)
  try {
    const y = tenDivideBy(0)
    return y
  } catch (error) {
    return 1
  }
}

type ParsedItem = { _tag: 'parsedItem' } & Item
type FailedParsingItem = { name: string; message: string }
type ArrayItem = Array<Try<FailedParsingItem, ParsedItem>>

const parseItem = (item: Item): Try<FailedParsingItem, ParsedItem> => {
  if (item.quantity < 1) {
    return failure({
      name: 'Item',
      message: `${item.name} 1개 이상 필요`,
    })
  }

  if (item.quantity > 10) {
    return failure({
      name: 'Item',
      message: `${item.name} 10개 초과함`,
    })
  }

  return success({
    _tag: 'parsedItem',
    ...item,
  })
}

const map = <E, A, B>(ta: Try<E, A>, f: (a: A) => B): Try<E, B> => {
  if (isFailure(ta)) return ta
  return success(f(ta.result))
}

const errorItem = (e: FailedParsingItem): string => {
  return `${e.name}: ${e.message}`
}

// Array<Try<FailedParsingItem, ParsedItem>> => Array<ParsedItem>
const validateArrayWithFlatMap = <E, R>(tas: Array<Try<E, R>>): Array<R> => {
  // 2번 순회 ~> 요소 변환 후 다시 순회 하며 필터링
  // const ret = tas
  //   .map((ta) => {
  //     if (isSuccess(ta)) return ta.result
  //     else return
  //   })
  //   .filter((x): x is R => x !== undefined)

  // 1번 순회 ~> 순회 하면서 요소 변환 및 필터링
  const ret = tas.flatMap((x) => {
    // 값을 리턴하겠다 라는 선언형 코딩
    if (isSuccess(x)) return [x.result]
    else return []
  })

  return ret
}

const validateArrayWithFor = <E, R>(tas: Array<Try<E, R>>): Array<R> => {
  const ret: Array<R> = []
  for (const ta of tas) {
    if (isSuccess(ta)) {
      // 어떤 행동을 하라라는 형식의 명령형 코딩(선언한 배열에 push를 하라)
      ret.push(ta.result)
    }
  }

  return ret
}
/**
 * 중첩된 Try 타입은 이러한 함수를 연속적으로 호출하는 경우에 발생
 * f: A -> Try<E, B>
 * g: B -> Try<E, C>
 * flatMap(f(a), g): Try<E, C>
 */
// flat :: Try<E, Try<E, A>> => Try<E, A>
const flat = <E, A>(ta: Try<E, Try<E, A>>): Try<E, A> => {
  console.log('ta chek \n', ta)
  /** ta의 값
  success ? {
    _tag: 'success',
    result: {
      _tag: 'success',
      result: {
        _tag: 'parsedItem',
        code: 'tomato',
        outOfStock: false,
        name: '토마토',
        price: 7000,
        quantity: 2,
        discountPrice: 1000
      }
    }
  } : { _tag: 'failure', error: { name: 'Item', message: '오렌지 1개 이상 필요' } }
  **/
  if (isFailure(ta)) return ta

  return ta.result
}

const flatMap = <E, A, B>(ta: Try<E, A>, f: (a: A) => Try<E, B>): Try<E, B> => {
  return flat(map(ta, f))
}

const main = () => {
  // _tag외에 다른 정보를 사용하거나 넘길 수 없음!
  // console.log('No Map: ', parseItem(cart[0]))

  // const parsedMap = map(parseItem(cart[0]), (item) => {
  //   return `${item.name}`
  // })

  // console.log('Yes Map: ', parsedMap)

  // console.log('Check Map Value: ', getOrElse(parsedMap, errorItem))

  // const arrayCart: ArrayItem = cart.map(parseItem)

  // console.log('validateArrayWithFaltMap: ', validateArrayWithFlatMap(arrayCart))
  console.log(
    'flat :: ',
    flatMap(parseItem(cart[0]), (item) => {
      // return success(f(ta.result)) 이 부분에서 f가 실행되므로 item은 ta.result의 값이 나오는게 마따
      // console.log('item', item)
      return success(item)
    })
  )
}

export default main
