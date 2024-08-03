import { createContext, useMemo, useState } from 'react'
import { RESULTS_PER_PAGE } from '../lib/constants'
import { useSearchQuery, useSearchTextContext } from '../lib/hooks'
import { PageDirection, SortBy, TJobItem } from '../lib/types'

type JobItemsContextType = {
  jobItems: TJobItem[] | undefined
  jobItemsSortedAndSliced: TJobItem[]
  isLoading: boolean
  totalNumberOfResults: number
  totalNumberOfPages: number
  currentPage: number
  sortBy: SortBy
  handleChangePage: (direction: PageDirection) => void
  handleChangeSortBy: (newSortBy: SortBy) => void
}

export const JobItemsContext = createContext<JobItemsContextType | null>(null)

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { debounceSearchText } = useSearchTextContext()
  const { jobItems, isLoading } = useSearchQuery(debounceSearchText)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<SortBy>('relevant')

  const totalNumberOfResults = jobItems?.length || 0
  const totalNumberOfPages = totalNumberOfResults / 7
  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])]?.sort((a, b) => {
        if (sortBy === 'relevant') {
          return b.relevanceScore - a.relevanceScore
        } else {
          return a.daysAgo - b.daysAgo
        }
      }),
    [sortBy, jobItems]
  )

  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted?.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ) || [],
    [currentPage, jobItemsSorted]
  )

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
    <JobItemsContext.Provider
      value={{
        jobItems,
        jobItemsSortedAndSliced,
        isLoading,
        totalNumberOfResults,
        totalNumberOfPages,
        currentPage,
        sortBy,
        handleChangePage,
        handleChangeSortBy,
      }}
    >
      {children}
    </JobItemsContext.Provider>
  )
}
