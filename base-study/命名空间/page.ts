// 引用标签来告诉编译器文件之间的关联
/// <reference path="./component.ts" />

namespace Home {
  export class Page{
    user: Component.User = {
      name: '123'
    }
    constructor() {
      new Component.Header()
      new Component.Content()
      new Component.Footer()
      new Component.SubComponent.Test()
    }
  }
}

// 当涉及到多文件时，我们必须确保所有编译后的代码都被加载了。 我们有两种方式。
// 第一种方式，把所有的输入文件编译为一个输出文件，需要使用--outFile标记：

// tsc --outFile main.js page.ts component.ts

// 第二种方式，我们可以编译每一个文件（默认方式），那么每个源文件都会对应生成一个JavaScript文件。 
// 然后，在页面上通过<script>标签把所有生成的JavaScript文件按正确的顺序引进来，

// <script src="page.js" type="text/javascript" />
// <script src="component.js" type="text/javascript" />