import React, { createContext, useState } from 'react'
import classnames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void

export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenSubMenus?: string[]
}

interface IMenuContext {
  index: string,
  onSelect?: SelectCallback,
  mode?: MenuMode,
  defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({index: '0'})

const Menu: React.FC<MenuProps> = (props) => {
  const {defaultIndex, className, mode, defaultOpenSubMenus, style, children, onSelect} = props
  const [currentIndex, setActiveIndex] = useState(defaultIndex)

  const classes = classnames('lll-menu', className, 'menu-' + mode)

  const handleClick = (index: string) => {
    setActiveIndex(index)
    onSelect && onSelect(index)
  }

  const passedContext: IMenuContext = {
    index: currentIndex || '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }

  const renderChild = React.Children.map(children, (child, index) => {
    let childElement = child as React.FunctionComponentElement<MenuItemProps>
    let { displayName } = childElement.type
    if(displayName === 'MenuItem' || displayName === 'SubMenu') {
      return React.cloneElement(childElement, {
        index: index.toString()
      })
    } else {
      console.error('Menu的子元素只能是MenuItem 或者 SubMenu')
    }
  })

  return (
    <MenuContext.Provider value={passedContext}>
      <ul className={classes} style={style} data-testid='test-menu'>
        {renderChild}
      </ul>
    </MenuContext.Provider>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}

export default Menu
