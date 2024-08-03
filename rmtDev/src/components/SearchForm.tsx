import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useSearchTextContext } from '../lib/hooks'

export default function SearchForm() {
  const { searchText, handleChangeSearchText } = useSearchTextContext()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeSearchText(e.target.value)
  }
  return (
    <form action="#" className="search">
      <button type="submit">
        <MagnifyingGlassIcon />
      </button>

      <input
        value={searchText}
        onChange={handleChange}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  )
}
