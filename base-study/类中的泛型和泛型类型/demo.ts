interface Item {
  name: string
}

class DataManage<T extends Item> {
  constructor(private data: Array<T>){}
  getItem(index: number):string {
    return this.data[index].name
  }
}

const data = new DataManage<Item>([{name: '213'}])

console.log(data.getItem(0))

// 如何使用泛型作为一个具体的泛型注解
function hello<T>(params): T {
  return params
}

let fun: <T>(params) => T = hello
