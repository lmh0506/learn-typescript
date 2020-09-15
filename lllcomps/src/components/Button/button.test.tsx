import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, {ButtonType, ButtonSize, ButtonProps} from './button'
const defaultProps = {
  onClick: jest.fn()
}

const testProps:ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'custom-class'
}

const linkProps:ButtonProps = {
  btnType: ButtonType.Link,
  href: 'http://www.baidu.com'
}

const disabledProps:ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

describe('test Button components', () => {
  it('是否正确渲染 default button', () => {
    // 获取组件
    let wrapper = render(<Button {...defaultProps}>Test</Button>)
    // 通过文字获取dom
    let element = wrapper.getByText('Test')
    // 判断dom是否正确被添加到文档
    expect(element).toBeInTheDocument()
    // 判断是否为button标签
    expect(element.tagName).toEqual('BUTTON')
    // 判断是否为default的class
    expect(element).toHaveClass('btn btn-default')
    // 点击button
    fireEvent.click(element)
    // 判断测试方法是否被执行
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  
  it('是否正确渲染 不同props的 button', () => {
    // 获取组件
    let wrapper = render(<Button {...testProps}>Test</Button>)
    // 通过文字获取dom
    let element = wrapper.getByText('Test')
    // 判断dom是否正确被添加到文档
    expect(element).toBeInTheDocument()
    // 判断是否含有相应的class
    expect(element).toHaveClass('btn-primary btn-lg custom-class')

  })
  it('是否正确渲染 含有href标签且btnType为link的 button', () => {
    // 获取组件
    let wrapper = render(<Button {...linkProps}>Test</Button>)
    // 通过文字获取dom
    let element = wrapper.getByText('Test')
    // 判断dom是否正确被添加到文档
    expect(element).toBeInTheDocument()
    // 判断是否为a标签
    expect(element.tagName).toEqual('A')

  })
  it('是否正确渲染 disabled button', () => {
    // 获取组件
    let wrapper = render(<Button {...disabledProps}>Test</Button>)
    // 通过文字获取dom
    let element = wrapper.getByText('Test') as HTMLButtonElement
    // 判断dom是否正确被添加到文档
    expect(element).toBeInTheDocument()
    // 判断是否为button标签
    expect(element.tagName).toEqual('BUTTON')
    // 判断button disabled 是否为true
    expect(element.disabled).toBeTruthy()
    // 点击button
    fireEvent.click(element)
    // 判断测试方法是否没有执行
    expect(disabledProps.onClick).not.toHaveBeenCalled()
    
  })
})

