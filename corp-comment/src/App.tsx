import { useEffect } from 'react'
import HashtagList from './components/hashtag/HashtagList'
import Container from './components/layout/Container'
import Footer from './components/layout/Footer'
import { useFeedbackItemsStore } from './stores/feedbackItemsStore'

function App() {
  const fetchedFeedbackItems = useFeedbackItemsStore(
    (state) => state.fetchFeedbackItems
  )

  useEffect(() => {
    fetchedFeedbackItems()
  }, [fetchedFeedbackItems])
  return (
    <div className="app">
      <Footer />
      <Container />
      <HashtagList />
    </div>
  )
}

export default App
