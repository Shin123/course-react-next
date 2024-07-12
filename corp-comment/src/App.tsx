import { useEffect, useState } from 'react'
import Container from './components/Container'
import Footer from './components/Footer'
import HashtagList from './components/HashtagList'
import { TFeedbackItem } from './lib/types'

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleAddToList = (text: string) => {
    const companyName = text
      .split(' ')
      .find((word: string) => word.includes('#'))!
      .substring(1)

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    }

    setFeedbackItems([...feedbackItems, newItem])
  }

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true)

      try {
        const response = await fetch(
          'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks'
        )

        if (!response.ok) {
          throw new Error('Could not fetch data')
        }

        const data = await response.json()
        setFeedbackItems(data.feedbacks)
      } catch (error) {
        setErrorMessage('Something went wrong. Please try again later')
      }

      setIsLoading(false)
    }

    fetchFeedbackItems()
  }, [])

  return (
    <div className="app">
      <Footer />

      <Container
        feedbackItems={feedbackItems}
        isLoading={isLoading}
        errorMessage={errorMessage}
        handleAddToList={handleAddToList}
      />

      <HashtagList />
    </div>
  )
}

export default App
