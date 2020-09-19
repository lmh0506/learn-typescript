import React from 'react';
import Button, {ButtonSize, ButtonType} from './components/Button/button'
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'

function App() {
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
        <Button className="custom">Hello</Button>
        <Button disabled>Hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>hello</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>hello</Button>
        <Button btnType={ButtonType.Link} target="blank" autoFocus href="https://www.baidu.com">baidu</Button>
        <Button btnType={ButtonType.Link} disabled href="https://www.baidu.com">baidu</Button>
      </header>
    </div>
  );
}

export default App;
