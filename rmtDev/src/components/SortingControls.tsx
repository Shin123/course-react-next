import { ArrowDownIcon } from '@radix-ui/react-icons'
import { useJobItemsContext } from '../lib/hooks'

export default function SortingControls() {
  const { sortBy, handleChangeSortBy } = useJobItemsContext()
  return (
    <section className="sorting">
      <ArrowDownIcon />

      <SortingButton
        onClick={() => handleChangeSortBy('relevant')}
        isActive={sortBy === 'relevant'}
      >
        Relevant
      </SortingButton>
      <SortingButton
        onClick={() => handleChangeSortBy('recent')}
        isActive={sortBy === 'recent'}
      >
        Recent
      </SortingButton>
    </section>
  )
}

type SortingButtonProps = {
  onClick: () => void
  isActive: boolean
  children: React.ReactNode
}

function SortingButton({ onClick, isActive, children }: SortingButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`sorting__button sorting__button--relevant ${
        isActive ? 'sorting__button--active' : ''
      }`}
    >
      {children}
    </button>
  )
}
