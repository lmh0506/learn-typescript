import React, { useState, useEffect, useContext } from 'react'
import useMousePosition from '../hooks/useMousePosition'
import {ThemeContext} from '../App'
const LikeButton: React.FC = () => {
  const [obj, setObj] = useState({count: 0, on: true})
  const position = useMousePosition()
  const theme = useContext(ThemeContext)
  useEffect(() => {
    console.log('button effect')
    document.title = '点击了' + obj.count + '次'

    // 每次 obj.count 变化时才会执行
  }, [obj.count])
  console.log(theme)
  return (
    <>
      <h2 style={theme}>position: {position.x}, {position.y}</h2>
      <button onClick={() => setObj({...obj, count: obj.count + (obj.on ? 1 : -1)})}>
        {obj.count}
      </button>
      <button onClick={() => setObj({...obj, on: !obj.on})}>
        {obj.on ? 'ON' : 'OFF'}
      </button>
    </>
  )
}

export default LikeButton
