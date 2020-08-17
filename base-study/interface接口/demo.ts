// interface Person {
//   // 只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
//   // readonly name: string,  只读属性
//   name: string;
//   age?: number; // 非必填参数 加个？
//   // 有时候我们希望一个接口允许有任意的属性，可以使用如下方式：
//   // 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：
//   [propName: string]: any;
//   // 一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型 或者使用any类型
//   // [propName: string]: string | number;
//   say(): string;
// }

// // 接口继承
// interface Teacher extends Person {
//   teach(): string
// }

// // 函数型接口
// interface SayHi {
//   // 必须接受word参数
//   (word: string): string
// }

// type Person1 = string

// const getPersonName = (person: Person): void => {
//   console.log(person.name)
// }

// const setPersonName = (person: Person, name: string): void => {
//   person.name = name
// }

// const person = {
//   name: 'dell',
//   aa: 'sdsd',
//   say(){
//     return 'aaa'
//   }
// }

// getPersonName(person)

// setPersonName(person, 'test')

// getPersonName(person)

// // class  应用 interface
// class User1 implements Person {
//   name: 'user1';
//   say(){
//     return 'user'
//   }
// }

// const sayHi: SayHi = (word) => word

function reverse(x: number): number;
function reverse(y: string): string;
function reverse(x: number | string) {
  return x
}

console.log(reverse('12'))