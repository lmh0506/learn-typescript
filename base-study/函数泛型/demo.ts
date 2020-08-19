// 泛型 generic 泛指的类型
// 对于不确定的类型 使用泛型
function join<T>(first: T, seoncd: T) {
  return `${first}${seoncd}`
}

join<string>('2', '3')
join<number>(1, 1)

function map<ABC>(str: ABC[]) {
  return str
}

map<string>(['123'])

function mapSecond<T>(str: Array<T>) {
  return str
}

map<string>(['12'])

function joinSecond<T, P>(first: T, second: P) {
  return `${first}${second}`
}

joinSecond<number, string>(1, '2')
