// 类的装饰器
// 装饰器本身是一个函数
// 类接收的参数是构造函数
// 装饰器通过 @ 符号来使用

function testDecorator(construct: any) {
  construct.prototype.getName = () => {
    console.log('name')
  }
  console.log(construct)
}

function testDecorator1(construct: any) {
  console.log('construct1')
}

function flagDecorator(flag: boolean) {
  return (construct: any) => {
    console.log(flag ? 'hello' : 'none')
  }
}


// 多个装饰器执行时  从下往上执行
@testDecorator
@testDecorator1
@flagDecorator(true)
class Test{
  constructor() {
    console.log('me')
  }
}

let test = new Test()
