const id = <A>(a: A): A => {
  return a
}

const cpsId = <A>(a: A, ret: (a: A) => void) => {
  ret(a)
}

export const main = () => {
  // direct style
  const a = id('test')
  console.log(a)

  // continuation-passing style
  const b = cpsId('test', (x) => {
    console.log(x + ' cps')
  })
}
