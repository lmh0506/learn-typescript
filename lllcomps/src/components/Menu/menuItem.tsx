import React, {useContext} from 'react'
import classnames from 'classnames'
import { MenuContext } from '../Menu/menu'

export interface MenuItemProps {
  index?: string;
  disable?: boolean;
  className?: string;
  style?: React.CSSProperties
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const {index, className, disable, style, children} = props
  const context = useContext(MenuContext)
  const classes = classnames('lll-menu-item', className, {
    'is-disabled': disable,
    'is-actived': context.index === index
  })

  const handleClick = () => {
    // 如果父级有选中的方法 且该组件没有被禁用
    if(context.onSelect && !disable && typeof index === 'string') {
      context.onSelect(index)
    }
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.defaultProps = {
  index: '0',
  disable: false
}

MenuItem.displayName = 'MenuItem'
export default MenuItem
