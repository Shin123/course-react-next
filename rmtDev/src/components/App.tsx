import { useState } from 'react'
import { useActiveId, useJobItem, useJobItems } from '../lib/hooks'
import Background from './Background'
import Container from './Container'
import Footer from './Footer'
import Header from './Header'

function App() {
  const [searchText, setSearchText] = useState('')
  const [jobItems, isLoading] = useJobItems(searchText)
  const activeId = useActiveId()

  const jobItem = useJobItem(activeId)
  console.log('🚀 ~ App ~ jobItem:', jobItem)

  return (
    <>
      <Background />

      <Header searchText={searchText} setSearchText={setSearchText} />

      <Container jobItems={jobItems} isLoading={isLoading} />

      <Footer />
    </>
  )
}

export default App
