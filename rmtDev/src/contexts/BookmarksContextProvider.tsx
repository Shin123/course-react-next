import { createContext, useEffect } from 'react'
import { useJobItems, useLocalStorage } from '../lib/hooks'
import { TJobItemExpanded } from '../lib/types'

type BookmarksContextType = {
  bookmarkedIds: number[]
  handleToggleBookmark: (id: number) => void
  bookmarkedJobItems: TJobItemExpanded[]
  isLoading: boolean
}

export const BookmarksContext = createContext<BookmarksContextType | null>(null)

export default function BookmarksContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    'bookmarkedIds',
    []
  )
  const { jobItems: bookmarkedJobItems, isLoading } = useJobItems(bookmarkedIds)
  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((i) => i !== id))
    } else {
      setBookmarkedIds([...bookmarkedIds, id])
    }
  }

  useEffect(() => {
    localStorage.setItem('bookmarkedIds', JSON.stringify(bookmarkedIds))
  }, [bookmarkedIds])

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        handleToggleBookmark,
        bookmarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  )
}
