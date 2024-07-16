import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import { useContext } from 'react'
import { BookmarksContext } from '../contexts/BookmarksContextProvider'

type Props = {
  id: number
}

export default function BookmarkIcon({ id }: Props) {
  const { bookmarkedIds, handleToggleBookmark } = useContext(BookmarksContext)
  console.log('🚀 ~ BookmarkIcon ~ bookmarkedIds:', bookmarkedIds)
  return (
    <button
      onClick={(e) => {
        handleToggleBookmark(id)
        e.stopPropagation()
        e.preventDefault()
      }}
      className="bookmark-btn"
    >
      <BookmarkFilledIcon
        className={`${bookmarkedIds.includes(id) ? 'filled' : ''}`}
      />
    </button>
  )
}
