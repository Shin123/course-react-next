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
  const [currentPage, setCurrentPage] = useState(1)
  console.log('🚀 ~ App ~ currentPage:', currentPage)

  const totalNumberOfResults = jobItems?.length || 0
  const totalNumberOfPage = totalNumberOfResults / 7
  const jobItemsSliced =
    jobItems?.slice(currentPage * 7 - 7, currentPage * 7) || []

  const handleChangePage = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      setCurrentPage(currentPage + 1)
    } else if (direction === 'previous') {
      setCurrentPage(currentPage - 1)
    }
  }

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

          <PaginationControls
            onChangePage={handleChangePage}
            currentPage={currentPage}
            totalNumberOfPage={totalNumberOfPage}
          />
        </Sidebar>

        <JobItemContent />
      </Container>
      <Footer />

      <Toaster position={'top-right'} />
    </>
  )
}

export default App
