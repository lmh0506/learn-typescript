import React from 'react'
import {fireEvent, render, RenderResult, cleanup, wait} from '@testing-library/react'

import Menu, { MenuProps } from '../Menu/menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const testMenuProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}

const testModeMenuProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disable>disabled</MenuItem>
      <MenuItem>333</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>1111</MenuItem>
        <MenuItem>2222</MenuItem>
        <MenuItem>3333</MenuItem>
      </SubMenu>
    </Menu>
  )
}

const cssStyleFile = () => {
  let cssFile = `
    .lll-menu{
      display: none;
    }
    .lll-submenu.menu-opened {
      display: block;
    }
  `
  let css = document.createElement('style')
  css.innerHTML = cssFile

  return css
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('test Menu and MenuItem component', () => {
  // 在每次下面的case执行前 先执行，并且在每次下面的case执行结束后会自动调用cleanup方法
  beforeEach(() => {
    wrapper = render(generateMenu(testMenuProps))
    wrapper.container.append(cssStyleFile())
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('Menu组件和MenuItem组件使用默认属性是否正确渲染', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('lll-menu')
    // 判断子元素数量
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
    expect(activeElement).toHaveClass('lll-menu-item is-actived')
    expect(disabledElement).toHaveClass('lll-menu-item is-disabled')
  })

  it('点击 MenuItem 是否正确切换显示，方法是否正确执行', () => {
    const thirdItem = wrapper.getByText('333')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-actived')
    expect(activeElement).not.toHaveClass('is-actived')
    expect(testMenuProps.onSelect).toHaveBeenCalledWith('2')

    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-actived')
    expect(testMenuProps.onSelect).not.toHaveBeenCalledWith('1')

  })

  it('切换Menu mode后是否正确渲染', () => {
    // 调用 cleanup 清除之前渲染的dom
    cleanup()
    let wrapper = render(generateMenu(testModeMenuProps))
    let menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })

  it('鼠标移到 SubMenu 显示 SubMenu 下的 MenuItem', () => {
    expect(wrapper.queryByText('1111')).not.toBeVisible()

    let subTitle = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(subTitle)
    wait(() => {
      expect(wrapper.queryByText('1111')).toBeVisible()
    })
    fireEvent.click(wrapper.getByText('1111'))
    expect(testMenuProps.onSelect).toHaveBeenCalledWith('3-0')

    fireEvent.mouseLeave(subTitle)
    wait(() => {
      expect(wrapper.queryByText('1111')).not.toBeVisible()
    })
  })
})
