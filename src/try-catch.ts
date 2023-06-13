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
const keepSuccess = <E, R>(tas: Array<Try<E, R>>): Array<R> => {
  // 2번 순회 ~> 요소 변환 후 다시 순회 하며 필터링
  // const ret = tas
  //   .map((ta) => {
  //     if (isSuccess(ta)) return ta.result
  //     else return
  //   })
  //   .filter((x): x is R => x !== undefined)

  // 1번 순회 ~> 순회 하면서 요소 변환 및 필터링
  const ret = tas.flatMap((x) => {
    if (isSuccess(x)) return [x.result]
    else return []
  })

  return ret
}

const main = () => {
  // _tag외에 다른 정보를 사용하거나 넘길 수 없음!
  console.log('No Map: ', parseItem(cart[0]))

  const parsedMap = map(parseItem(cart[0]), (item) => {
    return `${item.name}`
  })

  console.log('Yes Map: ', parsedMap)

  console.log('Check Map Value: ', getOrElse(parsedMap, errorItem))

  const arrayCart: ArrayItem = cart.map(parseItem)

  console.log('keepSuccess: ', keepSuccess(arrayCart))
}

export default main
