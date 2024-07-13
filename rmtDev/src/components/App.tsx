import { useState } from 'react'
import { useJobItems } from '../lib/hooks'
import Background from './Background'
import Container from './Container'
import Footer from './Footer'
import Header from './Header'

function App() {
  const [searchText, setSearchText] = useState('')
  const [jobItems, isLoading] = useJobItems(searchText)

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
