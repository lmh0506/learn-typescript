namespace Component {
  // 只有export后 才能访问namespace里的变量
  export interface User {
    name: string
  }

  // 子命名空间
  export namespace SubComponent {
    export class Test {
      constructor() {
        console.log('test')
      }
    }
  }

  export class Header { 
    constructor() {
      console.log('header')
    }
  }

  export class Content { 
    constructor() {
      console.log('content')
    }
  }

  export class Footer { 
    constructor() {
      console.log('footer')
    }
  }
}