import { useState } from 'react'
import { useJobItems } from '../lib/hooks'
import Background from './Background'
import BookmarksButton from './BookmarksButton'
import Container from './Container'
import Footer from './Footer'
import Header from './Header'
import HeaderTop from './HeaderTop'
import JobItemContent from './JobItemContent'
import JobList from './JobList'
import Logo from './Logo'
import PaginationControls from './PaginationControls'
import ResultsCount from './ResultsCount'
import SearchForm from './SearchForm'
import Sidebar from './Sidebar'
import SidebarTop from './SidebarTop'
import SortingControls from './SortingControls'

function App() {
  const [searchText, setSearchText] = useState('')
  const { jobItemsSliced, isLoading, totalNumberOfResults } =
    useJobItems(searchText)

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
            <ResultsCount totalNumberOfResults={totalNumberOfResults} />
            <SortingControls />
          </SidebarTop>

          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />

          <PaginationControls />
        </Sidebar>

        <JobItemContent />
      </Container>
      <Footer />
    </>
  )
}

export default App
