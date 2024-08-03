import { createContext, useState } from 'react'
import { useDebounce } from '../lib/hooks'

type SearchTextContextType = {
  searchText: string
  debounceSearchText: string
  handleChangeSearchText: (newSearchText: string) => void
}

export const SearchTextContext = createContext<SearchTextContextType | null>(
  null
)

export default function SearchTextContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [searchText, setSearchText] = useState('')
  const debounceSearchText = useDebounce(searchText, 500)

  const handleChangeSearchText = (newSearchText: string) => {
    setSearchText(newSearchText)
  }

  return (
    <SearchTextContext.Provider
      value={{ searchText, debounceSearchText, handleChangeSearchText }}
    >
      {children}
    </SearchTextContext.Provider>
  )
}
