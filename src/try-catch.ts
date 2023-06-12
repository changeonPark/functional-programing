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

const main = () => {
  const x = test()
  console.log(x)
  console.log('end')
}

export default main
