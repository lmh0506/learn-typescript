import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import Button from './button'

const defaultButton = () => (<Button onClick={action('default button click')}> default button</Button>)

const buttonWithSize = () => (
  <>
    <Button size="lg">larger button</Button>
    <Button size="sm">small button</Button>
  </>
)

const buttonWithType = () => (
  <>
    <Button btnType="primary">primary button</Button>
    <Button btnType="danger">danger button</Button>
    <Button btnType="link" href="https://www.baidu.com">link button</Button>
  </>
)
storiesOf('Button component', module)
.addDecorator(withInfo)
.addParameters({
  info: {
    text: `
    this is a very nice component
    ## this is a header
    ~~~ js
    const a = 'hello'
    ~~~
    `,
    inline: true
  }
})
.add('默认Button', defaultButton)
.add('不同尺寸的Button', buttonWithSize, {info: {inline: false}})
.add('不同类型的Button', buttonWithType)
