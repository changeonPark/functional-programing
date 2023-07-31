// _filter, _map으로 리팩토링
// 다형성이 높고, 데이터에 대한 관심사를 없앨 수 있음
function _filter(list, predicate) {
  const new_list = []
  _each(list, function (val) {
    if (predicate(val)) {
      new_list.push(val)
    }
  })

  return new_list
}

function _map(list, mapper) {
  const new_list = []

  _each(list, function (val) {
    new_list.push(mapper(val))
  })

  return new_list
}

function _each(list, iter) {
  for (let i = 0; i < list.length; i++) {
    iter(list[i])
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
