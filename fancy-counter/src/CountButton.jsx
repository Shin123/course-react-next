import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import React from 'react'

const CountButton = ({ type, setCount, locked }) => {
  const handleClick = (event) => {
    setCount((prev) => {
      if (type === 'minus') {
        const newCount = prev - 1
        if (newCount < 0) {
          return 0
        }
        return newCount
      } else {
        const newCount = prev + 1
        if (newCount > 5) {
          return 5
        }
        return newCount
      }
    })

    event.currentTarget.blur()
  }
  return (
    <button className="count-btn" onClick={handleClick} disabled={locked}>
      {type === 'plus' && <PlusIcon className="count-btn-icon" />}
      {type === 'minus' && <MinusIcon className="count-btn-icon" />}
    </button>
  )
}

export default CountButton
