import React from 'react'
import classnames from 'classnames'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

library.add(fas)

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps,
  classNames?: string
}

const Icon: React.FC<IconProps> = (props) => {
  const {classNames, theme, ...restProps} = props
  const classes = classnames('lll-icons', classNames, {
    [`icon-${theme}`]: theme
  })

  return (
    <FontAwesomeIcon className={classes} {...restProps}></FontAwesomeIcon>
  )
}

export default Icon
