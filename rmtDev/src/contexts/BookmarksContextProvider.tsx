import React, { createContext, useState } from 'react'

export const BookmarksContext = createContext(null)

export default function BookmarksContextProvider({ children }) {
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([])

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((i) => i !== id))
    } else {
      setBookmarkedIds([...bookmarkedIds, id])
    }
  }

  return (
    <BookmarksContext.Provider value={{ bookmarkedIds, handleToggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  )
}
