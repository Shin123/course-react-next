import { TFeedbackItem } from '../../lib/types'
import ErrorMessage from '../ErrorMessage'
import FeedbackItem from './FeedbackItem'
import Spinner from '../Spinner'

type Props = {
  feedbackItems: TFeedbackItem[]
  isLoading: boolean
  errorMessage: string
}

export default function FeedbackList({
  feedbackItems,
  isLoading,
  errorMessage,
}: Props) {
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}

      {feedbackItems.map((item) => (
        <FeedbackItem key={item.id} feedbackItem={item} />
      ))}
    </ol>
  )
}
