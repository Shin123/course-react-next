import React, { useState } from 'react'
import Textarea from './Textarea'
import Stats from './Stats'

export default function Container() {
  const [text, setText] = useState('')

  const numberOfWords = text.split(/\s/).filter((word) => word !== '').length
  const numberOfCharacters = text.length
  const instagramCharactersLeft = 280 - text.length
  const facebookCharactersLeft = 2200 - text.length

  const stats = {
    numberOfWords,
    numberOfCharacters,
    instagramCharactersLeft,
    facebookCharactersLeft,
  }
  return (
    <main className="container">
      <Stats stats={stats} />
      <Textarea text={text} setText={setText} />
    </main>
  )
}
