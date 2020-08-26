interface Person {
  name: string;
  age: number;
  sex: boolean;
}

class Student {
  constructor(private info){}
  getInfo<T extends keyof Person>(key: T): Person[T] {
    return this.info[key]
  }
}

let t = new Student({
  name: '张三',
  age: 18,
  sex: true
})

console.log(t.getInfo('age'))
