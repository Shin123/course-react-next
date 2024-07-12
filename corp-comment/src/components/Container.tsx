import React from 'react'
import Header from './Header'
import FeedbackList from './FeedbackList'

type Props = {}

export default function Container({}: Props) {
  return (
    <main className="container">
      <Header />
      <FeedbackList />
    </main>
  )
}
