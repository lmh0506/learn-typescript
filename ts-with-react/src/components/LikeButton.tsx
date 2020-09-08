import React, { useState, useEffect } from 'react'
const LikeButton: React.FC = () => {
  const [obj, setObj] = useState({count: 0, on: true})
  useEffect(() => {
    document.title = '点击了' + obj.count + '次'
  })
  return (
    <>
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
