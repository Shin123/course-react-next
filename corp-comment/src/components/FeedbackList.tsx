import { useEffect, useState } from 'react'
import FeedbackItem from './FeedbackItem'
import Spinner from './Spinner'
import ErrorMessage from './ErrorMessage'

type Props = {}

export default function FeedbackList({}: Props) {
  const [feedbackItems, setFeedbackItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

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
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}

      {feedbackItems.map((item) => (
        <FeedbackItem feedbackItem={item} />
      ))}
    </ol>
  )
}
