import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

type Props = {
  searchText: string
  setSearchText: React.Dispatch<React.SetStateAction<string>>
}
export default function SearchForm({ searchText, setSearchText }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
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
