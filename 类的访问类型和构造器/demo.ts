// private protected public 访问类型

// public 允许属性或者方法在类的内外被调用
// private 允许在类内被调用
// protected 允许在类内及继承的子类中使用
class Person {
  // 传统写法
  // name: string;
  private age: number;
  // protected height: number;

  // 简化写法
  constructor(public name: string, protected height: number){
    this.name = name
    this.height = height
  }

  sayHi(){
    console.log(this.height)
    console.log('hi')
  }
}

class Teacher extends Person {
  constructor(public name: string, protected height: number, public className: string){
    super(name, height)
    this.className = className
  }

  sayBye(){
    console.log('bye')
    console.log(this.name, this.height, this.className)
  }
}

const person = new Person('222', 22)
person.name = 'lll'
console.log(person.name)

person.sayHi()

const teacher = new Teacher('tt', 33, 'www')
teacher.sayBye()