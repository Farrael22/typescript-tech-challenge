export type Result<T, E = string> = Success<T> | Failure<E>

export interface Success<T> {
  success: true
  data: T
  error?: never
}

export interface Failure<E = string> {
  success: false
  error: E
  data?: never
}

export const success = <T>(data: T): Success<T> => ({
  success: true,
  data,
})

export const failure = <E = string>(error: E): Failure<E> => ({
  success: false,
  error,
})

export const isSuccess = <T, E>(result: Result<T, E>): result is Success<T> => result.success

export const isFailure = <T, E>(result: Result<T, E>): result is Failure<E> => !result.success
