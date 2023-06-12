// 실패하거나 성공했을 때 다른 값을 가지는 자료 구조

// return에 Type 사용될 경우 never
// parameter에 Tpye 사용될 경우 unknown

type Success<R> = {
  readonly _tag: 'success'
  readonly result: R
}

type Failure<E> = {
  readonly _tag: 'failure'
  readonly error: E
}

export type Try<E, R> = Failure<E> | Success<R>

export const success = <R>(result: R): Try<never, R> => ({
  _tag: 'success',
  result,
})

export const failure = <E>(error: E): Try<E, never> => ({
  _tag: 'failure',
  error,
})

export const isSuccess = <R>(ta: Try<unknown, R>): ta is Success<R> => ta._tag === 'success'

export const isFailure = <E>(ta: Try<E, unknown>): ta is Failure<E> => ta._tag === 'failure'

export const getOrElse = <E, R>(ta: Try<E, R>, defaultValue: (e: E) => R): R => {
  // 에러가 있을 경우 에러에 기반해 기본 값 사용
  if (isFailure(ta)) return defaultValue(ta.error)
  // 결과 성공 시 해당 값을 사용
  return ta.result
}
