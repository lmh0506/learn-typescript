const userInfo: any = undefined

function catchError(msg: string) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    let fn = descriptor.value
    descriptor.value = () => {
      try {
        fn()
      } catch(e) {
        console.log(msg)
      }
    }
  }
}

class Example {
  @catchError('userinfo.age 不存在')
  getAge() {
    return userInfo.age
  }
  
  @catchError('userinfo.name 不存在')
  getName() {
    return userInfo.name
  }
}

let exam = new Example()
exam.getAge()
exam.getName()
