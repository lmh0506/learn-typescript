abstract class Geom {
  abstract getArea(): number;
  width: number;
  getType(){
    return 'type'
  }
}

// 抽象类不能被实例化
// let test = new Geom()

class Circle extends Geom {
  getArea(): number{
    return 123
  }
}

interface Animal {
  name: string
}

interface Dog extends Animal{
  age: number
}

interface Cat extends Animal {
  weight: number
}

let dog: Dog = {
  name: 'dog',
  age: 1
}

let cat: Cat = {
  name: 'cat',
  weight: 11
}

let getAnimal = (animal: Animal) => {
  console.log(animal.name)
}

getAnimal(dog)
getAnimal(cat)
