import React from 'react'
import Logo from './Logo'
import Counter from './Counter'

export default function Header({ totalNumberOfItems, numberOfItemsPacked }) {
  return (
    <header>
      <Logo />
      <Counter
        totalNumberOfItems={totalNumberOfItems}
        numberOfItemsPacked={numberOfItemsPacked}
      />
    </header>
  )
}
