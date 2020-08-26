// 方法装饰器
// 普通方法 target 对应的是类的 prototype
// 静态方法  target 对应的是类的构造函数
function getNameDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  // descriptor 相当于 Object.defineProperty(obj, prop, descriptor) 中的 descriptor

  // console.log(target, key)
  // 阻止外部对方法进行修改
  // descriptor.writable = false
  // 修改原来的方法
  descriptor.value = () => 'test'
}

Object.defineProperty

class FuncDecor {
  name: string;
  constructor(name: string) {
    this.name = name
  }

  @getNameDecorator
  getName() {
    return this.name
  }

  
  @getNameDecorator
  static test() {
    return '123'
  }
}

let fun = new FuncDecor('lee')
console.log(fun.getName())
