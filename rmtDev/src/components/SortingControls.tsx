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

      <SortingButton
        onClick={() => onClick('relevant')}
        isActive={sortBy === 'relevant'}
      >
        Relevant
      </SortingButton>
      <SortingButton
        onClick={() => onClick('recent')}
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
