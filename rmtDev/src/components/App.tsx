import { useState } from 'react'
import { useActiveJobItem, useJobItems } from '../lib/hooks'
import Background from './Background'
import BookmarksButton from './BookmarksButton'
import Container from './Container'
import Footer from './Footer'
import Header from './Header'
import Logo from './Logo'
import SearchForm from './SearchForm'
import Sidebar from './Sidebar'
import JobItemContent from './JobItemContent'
import SidebarTop from './SidebarTop'
import ResultsCount from './ResultsCount'
import SortingControls from './SortingControls'
import JobList from './JobList'
import PaginationControls from './PaginationControls'
import HeaderTop from './HeaderTop'

function App() {
  const [searchText, setSearchText] = useState('')
  const [jobItems, isLoading] = useJobItems(searchText)
  const jobItem = useActiveJobItem()

  console.log('🚀 ~ App ~ jobItem:', jobItem)

  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount />
            <SortingControls />
          </SidebarTop>

          <JobList jobItems={jobItems} isLoading={isLoading} />

          <PaginationControls />
        </Sidebar>

        <JobItemContent jobItem={jobItem} />
      </Container>
      <Footer />
    </>
  )
}

export default App
