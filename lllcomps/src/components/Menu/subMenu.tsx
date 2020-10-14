import React, {useContext, useState, FunctionComponentElement} from 'react'
import classnames from 'classnames'
import {MenuContext} from './menu'
import {MenuItemProps} from './menuItem'
import Transition from '../Transition/transition'
// import { CSSTransition } from 'react-transition-group'
import Icon from '../Icon/icon'

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { title, index, className, children } = props
  let context = useContext(MenuContext)

  const openSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpened = (index && context.mode === 'vertical') ? openSubMenus.includes(index) : false
  let [isOpen, setIsOpen] = useState(isOpened)

  let classes = classnames('lll-menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': isOpen,
    'is-vertical': context.mode
  })

  let handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  let timer: any
  let handleHover = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setIsOpen(toggle)
    }, 100)
  }

  let clickEvent = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  let hoverEvent = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => {handleHover(e, true)},
    onMouseLeave: (e: React.MouseEvent) => {handleHover(e, false)}
  } : {}

  const renderChild = () => {
    let subMenuClasses = classnames('lll-submenu', {
      'menu-opened': isOpen
    })
    let childrenCompent = React.Children.map(children, (child, i) => {
      let childElement = child as FunctionComponentElement<MenuItemProps>
      let {displayName} = childElement.type
  
      if(displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: index + '-' + i
        })
      } else {
        console.error('SubMenu 的子元素只能是 MenuItem')
      }
  
    })
    return (
      <Transition 
        in={isOpen}
        timeout={300}
        classNames="zoom-in-top"
      >
        <ul className={subMenuClasses}>
          {childrenCompent}
        </ul>
      </Transition>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvent}>
      <div className="submenu-title" {...clickEvent}>
        {title}
        <Icon className="arrow-icon" icon="angle-down"></Icon>
      </div>
      {renderChild()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu
