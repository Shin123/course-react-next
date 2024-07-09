import { ResetIcon } from '@radix-ui/react-icons'
import React from 'react'

const ResetButton = ({ setCount }) => {
  const handleClick = (event) => {
    setCount(0)
    event.currentTarget.blur()
  }
  return (
    <button className="reset-btn" onClick={handleClick}>
      <ResetIcon className="reset-btn-icon" />
    </button>
  )
}

export default ResetButton
