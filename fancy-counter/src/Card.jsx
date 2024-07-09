import React, { useEffect, useState } from 'react'
import ButtonContainer from './ButtonContainer'
import Count from './Count'
import ResetButton from './ResetButton'
import Title from './Title'
import CountButton from './CountButton'

const Card = () => {
  const [count, setCount] = useState(0)
  const locked = count === 5 ? true : false
  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.code === 'Space') {
        const newCount = count + 1
        if (newCount > 5) {
          setCount(5)
          return
        }
        setCount(newCount)
      }
    }
    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [count])
  console.log('render')
  return (
    <div className={`card ${locked ? 'card--limit' : ''}`}>
      <Title locked={locked} />
      <Count count={count} />
      <ResetButton setCount={setCount} />
      <ButtonContainer>
        <CountButton type="minus" setCount={setCount} locked={locked} />
        <CountButton type="plus" setCount={setCount} locked={locked} />
      </ButtonContainer>
    </div>
  )
}

export default Card
