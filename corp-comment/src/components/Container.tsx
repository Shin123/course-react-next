import { TFeedbackItem } from '../lib/types'
import FeedbackList from './FeedbackList'
import Header from './Header'

type Props = {
  isLoading: boolean
  feedbackItems: TFeedbackItem[]
  errorMessage: string
  handleAddToList: (text: string) => void
}

export default function Container({
  feedbackItems,
  isLoading,
  errorMessage,
  handleAddToList,
}: Props) {
  return (
    <main className="container">
      <Header handleAddToList={handleAddToList} />
      <FeedbackList
        feedbackItems={feedbackItems}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </main>
  )
}
