import { forwardRef } from 'react'
import { useBookmarksContext } from '../lib/hooks'
import JobList from './JobList'

const BookmarksPopover = forwardRef<HTMLDivElement>((_, ref) => {
  const { isLoading, bookmarkedJobItems } = useBookmarksContext()
  return (
    <div ref={ref} className="bookmarks-popover">
      <JobList isLoading={isLoading} jobItems={bookmarkedJobItems} />
    </div>
  )
})

export default BookmarksPopover
