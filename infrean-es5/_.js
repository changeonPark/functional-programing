// _filter, _map으로 리팩토링
// 다형성이 높고, 데이터에 대한 관심사를 없앨 수 있음
function _filter(list, predicate) {
  if (!predicate)
    return function (arr2) {
      return _filter(arr2, list)
    }

  const new_list = []

  _each(list, function (val) {
    if (predicate(val)) {
      new_list.push(val)
    }
  })

  return new_list
}

function _map(list, mapper) {
  if (!mapper)
    return function (arr2) {
      return _map(arr2, list)
    }

  const new_list = []

  _each(list, function (val) {
    new_list.push(mapper(val))
  })

  return new_list
}

const newMap = _curryr(_map)
const newFilter = _curryr(_filter)

// _keys 만들기
function _is_object(obj) {
  return typeof obj === "object" && !!obj
}

function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : []
}

function _each(list, iter) {
  const keys = _keys(list)

  for (let i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]])
  }

  return list
}

// currying => 함수와 인자를 다루는 기법, 함수에 인자를 하나씩 적용하다가 필요한 인자 모두 충족 시 함수 본체 실행
// js에서는 일급 함수 지원 및 평가 시점 자유도로 인해 currying 구현 가능

// 1. _curry, _cuuryr(curry right)

function _curry(fn) {
  return function (a, b) {
    return arguments.length === 2
      ? fn(a, b)
      : function (b) {
          return fn(a, b)
        }
  }
}

function _curryr(fn) {
  return function (a, b) {
    return arguments.length === 2
      ? fn(a, b)
      : function (b) {
          return fn(b, a)
        }
  }
}

// 2. _get을 만들어 간단한게 변형
const _get = _curryr(function (obj, key) {
  return obj === null || obj === undefined ? undefined : obj[key]
})

// _reduce => Array.reduce 직접 구현해보기

// Array Like 객체를 Array처럼 slice를 사용하기 위한 함수
function _rest(list, num) {
  const slice = Array.prototype.slice
  return slice.call(list, num || 1)
}

function _reduce(list, iters, memo) {
  if (arguments.length === 2) {
    memo = list[0]
    list = _rest(list)
  }

  _each(list, function (val) {
    memo = iters(memo, val)
  })

  return memo
}

// pipe: 함수를 return
function _pipe() {
  const fns = arguments

  return function (arg) {
    return _reduce(
      fns,
      function (arg, fn) {
        return fn(arg)
      },
      arg
    )
  }
}

// go: 즉시 실행되는 pipe 함수
function _go(arg) {
  const fns = _rest(arguments, 1)

  return _pipe.apply(null, fns)(arg)
}

function _identitiy(val) {
  return val
}

const _values = _map(_identitiy)

// object 내부의 지정된 key의 values를 배열로 반환
function _pluck(data, key) {
  return _map(data, (obj) => {
    return obj[key]
  })
}

// callback의 조건과 반대되는 값 반환
function _negate(func) {
  return function (val) {
    return !func(val)
  }
}

// data 중 predicate 조건을 만족하지 않는 값을 배열로 반환
const _reject = _curryr((data, predicate) => {
  return _filter(data, _negate(predicate))
})

// data 중 truty 한 값 반환
function _compact(data) {
  return _filter(data, _identitiy)
}

// 조건에 만족하는 첫 번째 값 반환, 없으면 undefined
const _find = _curryr(function (list, predicate) {
  const keys = _keys(list)

  for (let i = 0, len = keys.length; i < len; i++) {
    const value = list[keys[i]]
    if (predicate(value)) return value
  }
})

// 조건에 만족하는 첫 번째 값의 index 반환, 없으면 -1
const _find_index = _curryr(function (list, predicate) {
  const keys = _keys(list)

  for (let i = 0, len = keys.length; i < len; i++) {
    if (predicate(list[keys[i]])) return i
  }

  return -1
})

// 조건에 부합하는 값이 1개라도 있으면 true
function _some(data, predicate) {
  return _find_index(data, predicate || _identitiy) !== -1
}

// 모든 값이 조건에 부합해야 true
function _every(data, predicate) {
  return _find_index(data, _negate(predicate || _identitiy)) === -1
}

function _min(data) {
  return _reduce(data, (a, b) => (a < b ? a : b))
}

function _max(data) {
  return _reduce(data, (a, b) => (a > b ? a : b), 0)
}

const _min_by = _curryr(function (data, iter) {
  return _reduce(data, (a, b) => (iter(a) < iter(b) ? a : b))
})

const _max_by = _curryr((data, iter) => {
  return _reduce(data, (a, b) => (iter(a) > iter(b) ? a : b))
})
