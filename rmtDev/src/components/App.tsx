import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { RESULTS_PER_PAGE } from '../lib/constants'
import { useDebounce, useSearchQuery } from '../lib/hooks'
import { PageDirection, SortBy } from '../lib/types'
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
  const debounceSearchText = useDebounce(searchText, 500)
  const { jobItems, isLoading } = useSearchQuery(debounceSearchText)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<SortBy>('relevant')

  const totalNumberOfResults = jobItems?.length || 0
  const totalNumberOfPage = totalNumberOfResults / 7
  const jobItemsSorted = [...(jobItems || [])]?.sort((a, b) => {
    if (sortBy === 'relevant') {
      return b.relevanceScore - a.relevanceScore
    } else {
      return a.daysAgo - b.daysAgo
    }
  })
  const jobItemsSortedAndSliced =
    jobItemsSorted?.slice(
      currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
      currentPage * RESULTS_PER_PAGE
    ) || []

  const handleChangePage = (direction: PageDirection) => {
    if (direction === 'next') {
      setCurrentPage(currentPage + 1)
    } else if (direction === 'previous') {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleChangeSortBy = (newSortBy: SortBy) => {
    setCurrentPage(1)
    setSortBy(newSortBy)
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
            <SortingControls onClick={handleChangeSortBy} sortBy={sortBy} />
          </SidebarTop>

          <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />

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
