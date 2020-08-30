// 方法装饰器
// 普通方法 target 对应的是类的 prototype
// 静态方法  target 对应的是类的构造函数
function getNameDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  // descriptor 相当于 Object.defineProperty(obj, prop, descriptor) 中的 descriptor

  console.log('getNameDecorator', target, key, descriptor)
  // 阻止外部对方法进行修改
  // descriptor.writable = false
  // 修改原来的方法
  descriptor.value = () => 'test'
}

// 访问器的装饰器
function visitDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  // descriptor 相当于 Object.defineProperty(obj, prop, descriptor) 中的 descriptor
  console.log('visitDecorator', target, key, descriptor)
  // 阻止外部对方法进行修改
  descriptor.writable = false
}

// 参数装饰器
// 原型，方法名，参数下标
function paramDecorator(target: any, method: string, paramIndex: number) {
  console.log('paramDecorator', target, method, paramIndex)
}

// 属性访问器
function heightDecorator(target: any, key: string): any {
  // 修改的不是实例上的值 而是原型上的
  target[key] = 888
  // 属性访问器只能自己定义descriptor进行控制
  const descriptor: PropertyDescriptor = {
    writable: false
  }
  console.log('heightDecorator', target, key)

  return descriptor
}

class FuncDecor {
  name: string;
  private _age: number = 10;
  @heightDecorator
  height: number = 120; // 这里height定义的值将会放在实例上
  constructor(name: string) {
    this.name = name
  }

  getInfo(@paramDecorator a: number, @paramDecorator b: number){}

  @getNameDecorator
  getName() {
    return this.name
  }

  
  @getNameDecorator
  static test() {
    return '123'
  }

  // @visitDecorator
  // 同一个属性的get和set访问器 不能使用相同的装饰器
  get age() {
    return this._age
  }

  @visitDecorator
  set age(_age: number) {
    this._age = _age
  }
}

let fun = new FuncDecor('lee')
console.log(fun.getName())
fun.age = 12

fun.height = 111
console.log(fun.height)