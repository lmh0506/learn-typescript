import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import LikeButton from './components/LikeButton'
import MouseTrack from './components/MouseTrack'
import useMousePosition from './hooks/useMousePosition'
import useUrlLoader from './hooks/useUrlLoader'

interface IsShowResult {
  message: string,
  status: string
}

interface IThemeProps {
  [key: string]: {color: string, background: string}
}

const themes: IThemeProps = {
  'light': {
    color: '#000',
    background: '#eee'
  },
  'dark': {
    color: '#fff',
    background: '#222'
  }
}

export const  ThemeContext = React.createContext(themes.light)

function App() {
  const [themeType, setThemeType] = useState('light')
  const [show, setShow] = useState(true)
  const positon = useMousePosition()
  const [data, loading] = useUrlLoader('https://dog.ceo/api/breeds/image/random', [show])

  const dogResult = data as IsShowResult
  return (
    <div className="App">
      <ThemeContext.Provider value={themes[themeType]}>
        <header className="App-header">
        <button onClick={() => {setThemeType(themeType === 'light' ? 'dark' : 'light')}}>change Theme</button>
        <LikeButton></LikeButton>
        <MouseTrack></MouseTrack>
          <img src={logo} className="App-logo" alt="logo" />
          <p>position: {positon.x}, {positon.y}</p>
          <div onClick={() => {setShow(!show)}}>
            {
              show ? loading ? <p>读取中。。。</p> : <img src={dogResult && dogResult.message} alt=""/>
            : <p>random</p>
            }
          </div>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
