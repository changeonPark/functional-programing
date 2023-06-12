import { Try, failure, getOrElse, isFailure, success } from 'try.types'

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

type Item = {
  quantity: number
}

type ParsedItem = { _tag: 'parsedItem' } & Item
type FailedParsingItem = { name: string; message: string }

const parseItem = (item: Item): Try<FailedParsingItem, ParsedItem> => {
  if (item.quantity < 1) {
    return failure({
      name: 'Item',
      message: `1개 이상 필요`,
    })
  }

  if (item.quantity > 10) {
    return failure({
      name: 'Item',
      message: `10개 초과함`,
    })
  }

  return success({
    _tag: 'parsedItem',
    quantity: item.quantity,
  })
}

const map = <E, A, B>(ta: Try<E, A>, f: (a: A) => B): Try<E, B> => {
  if (isFailure(ta)) return ta
  return success(f(ta.result))
}

const errorItem = (e: FailedParsingItem): string => {
  return `${e.name}: ${e.message}`
}

const main = () => {
  // _tag외에 다른 정보를 사용하거나 넘길 수 없음!
  console.log('No Map: ', parseItem({ quantity: 2 }))

  const parsedMap = map(parseItem({ quantity: 1 }), (item) => {
    console.log(item)
    return `${item.quantity}`
  })

  console.log('Yes Map: ', parsedMap)

  console.log('Check Map Value: ', getOrElse(parsedMap, errorItem))
}

export default main
