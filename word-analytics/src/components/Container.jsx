import React, { useState } from 'react'
import Textarea from './Textarea'
import Stats from './Stats'
import {
  FACEBOOK_MAX_CHARACTERS,
  INSTAGRAM_MAX_CHARACTERS,
} from '../lib/constats'

export default function Container() {
  const [text, setText] = useState('')

  const numberOfWords = text.split(/\s/).filter((word) => word !== '').length
  const numberOfCharacters = text.length
  const instagramCharactersLeft = INSTAGRAM_MAX_CHARACTERS - text.length
  const facebookCharactersLeft = FACEBOOK_MAX_CHARACTERS - text.length

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
