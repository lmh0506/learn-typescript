import React, {useState, useEffect} from 'react'

const MouseTrack: React.FC = () => {
  const [postion, setPosition] = useState({x: 0, y: 0})
  useEffect(() => {
    console.log('add effect', postion.x)
    const updateMouse = (e: MouseEvent) => {
      console.log(e)
      setPosition({x: e.clientX, y: e.clientY})
    }
    document.addEventListener('click', updateMouse)

    return () => {
      console.log('remove effect', postion.x)
      document.removeEventListener('click', updateMouse)
    }
  })
  console.log('before render', postion.x)
  return (
    <>
      <p>x: {postion.x}</p>
      <p>y: {postion.y}</p>
    </>
  )
}

export default MouseTrack
