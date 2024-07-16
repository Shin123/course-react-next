import { forwardRef } from 'react'
import { useBookmarksContext } from '../lib/hooks'
import JobList from './JobList'
import { createPortal } from 'react-dom'

const BookmarksPopover = forwardRef<HTMLDivElement>((_, ref) => {
  const { isLoading, bookmarkedJobItems } = useBookmarksContext()
  return createPortal(
    <div ref={ref} className="bookmarks-popover">
      <JobList isLoading={isLoading} jobItems={bookmarkedJobItems} />
    </div>,
    document.body
  )
})

export default BookmarksPopover
