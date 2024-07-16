import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import { useBookmarksContext } from '../lib/hooks'

type Props = {
  id: number
}

export default function BookmarkIcon({ id }: Props) {
  const { bookmarkedIds, handleToggleBookmark } = useBookmarksContext()
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
