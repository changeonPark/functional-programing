const users = [
  { id: 1, name: "ID", age: 36 },
  { id: 2, name: "BJ", age: 32 },
  { id: 3, name: "JM", age: 32 },
  { id: 4, name: "PJ", age: 27 },
  { id: 5, name: "HA", age: 25 },
  { id: 6, name: "JE", age: 26 },
  { id: 7, name: "JI", age: 31 },
  { id: 8, name: "MP", age: 23 },
]

// 명령형 코드

// 1. 30세 이상인 users를 거른다.
const temp_users = []

for (let i = 0; i < users.length; i++) {
  if (users[i].age >= 30) {
    temp_users.push(users[i])
  }
}

// 2. 30세 이상인 users의 names를 수잡힌다.
const names = []
for (let i = 0; i < temp_users.length; i++) {
  names.push(temp_users[i].name)
}

// 3. 30세 미만인 users를 거른다.
const temp_users2 = []

for (let i = 0; i < users.length; i++) {
  if (users[i].age < 30) {
    temp_users2.push(users[i])
  }
}

// 4. 30세 미만인 users의 ages를 수집한다.
const ages = []
for (let i = 0; i < temp_users2.length; i++) {
  ages.push(temp_users2[i].age)
}

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

const over_30 = _filter(users, function (user) {
  return user.age >= 30
})
console.log("🚀 ~ file: change-functional.js:70 ~ over_30:", over_30)

const f_names = _map(over_30, function (user) {
  return user.name
})
console.log("🚀 ~ file: change-functional.js:74 ~ f_names:", f_names)

const under_30 = _filter(users, function (user) {
  return user.age < 30
})
console.log("🚀 ~ file: change-functional.js:80 ~ under_30:", under_30)

const f_ages = _map(under_30, function (user) {
  return user.age
})
console.log("🚀 ~ file: change-functional.js:85 ~ f_ages:", f_ages)

const over_30_names = _map(
  _filter(users, function (user) {
    return user.age >= 30
  }),
  function (user) {
    return user.name
  }
)
console.log(
  "🚀 ~ file: change-functional.js:95 ~ over_30_names:",
  over_30_names
)

/*
console.log(
  _filter([1, 2, 3, 4], function (x) {
    return x % 2
  })
)
*/
