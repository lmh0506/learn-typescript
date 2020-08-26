function highDecorator() {
  return <T extends new (...arg: any[]) => any>(constructor: T) => {
    return class extends constructor {
      name = 'lee'
      getName() {
        return this.name
      }
    }
  }
}

const TestDecor = highDecorator()(class {
  name: string;
  constructor(name: string) {
    this.name = name
  }
})
let t = new TestDecor('me')

console.log(t.getName())
