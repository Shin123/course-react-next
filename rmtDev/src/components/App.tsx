import { useState } from 'react'
import { useDebounce, useJobItems } from '../lib/hooks'
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
import { Toaster } from 'react-hot-toast'

function App() {
  const [searchText, setSearchText] = useState('')
  const debounceSearchText = useDebounce(searchText, 500)
  const { jobItems, isLoading } = useJobItems(debounceSearchText)

  const totalNumberOfResults = jobItems?.length || 0
  const jobItemsSliced = jobItems?.slice(0, 7) || []

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

      <Toaster position={'top-right'} />
    </>
  )
}

export default App
