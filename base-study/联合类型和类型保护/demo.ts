interface Bird {
  fly: boolean;
  sing: () => {}
}

interface Dog {
  fly: boolean;
  bark: () => {}
}

function trainAnimal(animal: Bird | Dog) {
  // 通过类型断言进行类型保护
  if(animal.fly) {
    (animal as Bird).sing()
  } else {
    (animal as Dog).bark()
  }
}

function trainAnimalSecond(animal: Bird | Dog) {
  // 通过 in 语法进行类型保护
  if('sing' in animal) {
    animal.sing()
  } else {
    animal.bark()
  }
}

function add(first: number | string, second: number | string) {
  // 通过 typeof 语法 进行类型保护
  if(typeof first === 'string' || typeof second === 'string'){
    return `${first}${second}`
  } else {
    return first + second
  }
}

class NumberObj {
  count: number
}

function addSecond(first: object | NumberObj, second: object | NumberObj) {
   // 通过 instanceof 语法 进行类型保护
  if(first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count
  } else {
    return 0
  }
}
