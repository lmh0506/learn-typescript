import React, {useState} from 'react';
import Button from './components/Button/button'
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Icon from './components/Icon/icon'
import Transition from './components/Transition/transition'

function App() {
  let [isShow, setShow] = useState(false)
  return (
    <div className="App">
      <header className="App-header">
        <Menu style={{margin: '20px'}} defaultOpenSubMenus={['3', '4']} onSelect={index => {console.log(index)}}>
          <MenuItem>123</MenuItem>
          <MenuItem>123</MenuItem>
          <MenuItem disable>123</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>111</MenuItem>
            <MenuItem>222</MenuItem>
            <MenuItem>333</MenuItem>
          </SubMenu>
          <SubMenu title="four">
            <MenuItem>111</MenuItem>
            <MenuItem>222</MenuItem>
            <MenuItem>333</MenuItem>
          </SubMenu>
        </Menu>
        <Icon icon="coffee" size="10x" theme="primary"></Icon>
        <Button className="custom">Hello</Button>
        <Button disabled>Hello</Button>
        <Button btnType="primary" size="lg" onClick={() => setShow(!isShow)}>toggle</Button>
        <Button btnType="danger" size="sm">hello</Button>
        <Button btnType="link" target="blank" autoFocus href="https://www.baidu.com">baidu</Button>
        <Button btnType="link" disabled href="https://www.baidu.com">baidu</Button>
      </header>
      <Transition
        in={isShow}
        timeout={300}
        animation="zoom-in-left"
        wrapper
      >
        <div>
          <p>aaaaaaaaaaaaaaaaaaaa</p>
          <p>aaaaaaaaaaaaaaaaaaaa</p>
          <p>aaaaaaaaaaaaaaaaaaaa</p>
          <p>aaaaaaaaaaaaaaaaaaaa</p>
          <p>aaaaaaaaaaaaaaaaaaaa</p>
          <p>aaaaaaaaaaaaaaaaaaaa</p>
          
        <Button className="custom">Hello</Button>
        </div>

      </Transition>
    </div>
  );
}

export default App;
