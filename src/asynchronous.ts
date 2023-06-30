const id = <A>(a: A): A => {
  return a
}

const cpsId = <A>(a: A, ret: (a: A) => void) => {
  ret(a)
}

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

export const main = () => {
  // // direct style
  // const a = id('test')
  // console.log(a)

  // // continuation-passing style
  // const b = cpsId('test', (x) => {
  //   console.log(x + ' cps')
  // })

  // callback hell
  a('hello', (x) => {
    b('hello2', (y) => {
      c('hello3', (z) => {
        console.log(z)
      })
    })
  })
}
