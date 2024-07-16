import { createContext, useEffect } from 'react'
import { useLocalStorage } from '../lib/hooks'

type BookmarksContextType = {
  bookmarkedIds: number[]
  handleToggleBookmark: (id: number) => void
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
    <BookmarksContext.Provider value={{ bookmarkedIds, handleToggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  )
}
