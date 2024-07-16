import { ArrowDownIcon } from '@radix-ui/react-icons'
import { SortBy } from '../lib/types'

type Props = {
  onClick: (sortBy: SortBy) => void
  sortBy: SortBy
}

export default function SortingControls({ onClick, sortBy }: Props) {
  return (
    <section className="sorting">
      <ArrowDownIcon />

      <button
        onClick={() => onClick('relevant')}
        className={`sorting__button sorting__button--relevant ${
          sortBy === 'relevant' ? 'sorting__button--active' : ''
        }`}
      >
        Relevant
      </button>

      <button
        onClick={() => onClick('recent')}
        className={`sorting__button sorting__button--recent ${
          sortBy === 'recent' ? 'sorting__button--active' : ''
        }`}
      >
        Recent
      </button>
    </section>
  )
}
