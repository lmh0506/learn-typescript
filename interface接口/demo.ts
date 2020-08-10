interface Person {
  // readonly name: string,  只读属性
  name: string;
  age?: number; // 非必填参数 加个？
  [propName: string]: any;
  say(): string;
}

// 接口继承
interface Teacher extends Person {
  teach(): string
}

// 函数型接口
interface SayHi {
  // 必须接受word参数
  (word: string): string
}

type Person1 = string

const getPersonName = (person: Person): void => {
  console.log(person.name)
}

const setPersonName = (person: Person, name: string): void => {
  person.name = name
}

const person = {
  name: 'dell',
  say(){
    return 'aaa'
  }
}

getPersonName(person)

setPersonName(person, 'test')

getPersonName(person)

// class  应用 interface
class User1 implements Person {
  name: 'user1';
  say(){
    return 'user'
  }
}

const sayHi: SayHi = (word) => word
