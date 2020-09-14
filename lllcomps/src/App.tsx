import React from 'react';
import Button, {ButtonSize, ButtonType} from './components/Button/button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
