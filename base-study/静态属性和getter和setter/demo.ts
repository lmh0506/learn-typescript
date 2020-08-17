// getter And setter
// class Animate {
// 私有属性前面加下划线
// 参数属性通过给构造函数参数添加一个访问限定符来声明。 
// 使用private限定一个参数属性会声明并初始化一个私有成员；对于public和protected来说也是一样。
// 声明和赋值合并至一处。
//   constructor(private _name: string) {}
//   get name() {
//     return this._name
//   }
//   set name(name: string){
//     this._name = name
//   }
// }

// let dog = new Animate('dog')
// console.log(dog.name)
// dog.name = 'set_dog'
// console.log(dog.name)

// 简单的单例模式
class Demo {
  private static instance: Demo
  // 使用私有constructor 避免外部创建新的对象
  private constructor(){}

  static getInstance() {
    if(!this.instance){
      this.instance = new Demo()
    }
    return this.instance 
  }
}

const demo1 = Demo.getInstance()
const demo2 = Demo.getInstance()
console.log(demo1 === demo2)