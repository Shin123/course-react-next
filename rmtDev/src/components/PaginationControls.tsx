import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'

type Props = {
  onChangePage: (direction: 'next' | 'previous') => void
  currentPage: number
  totalNumberOfPage: number
}

export default function PaginationControls({
  onChangePage,
  currentPage,
  totalNumberOfPage,
}: Props) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          direction="previous"
          currentPage={currentPage}
          onClick={() => onChangePage('previous')}
        />
      )}
      {currentPage < totalNumberOfPage && (
        <PaginationButton
          direction="next"
          currentPage={currentPage}
          onClick={() => onChangePage('next')}
        />
      )}
    </section>
  )
}

type PaginationButtonProps = {
  direction: 'previous' | 'next'
  currentPage: number
  onClick: () => void
}

function PaginationButton({
  direction,
  currentPage,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      onClick={(e) => {
        onClick()
        e.currentTarget.blur()
      }}
      className={`pagination__button pagination__button--${direction}`}
    >
      {direction === 'previous' && (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      )}

      {direction === 'next' && (
        <>
          Page {currentPage + 1}
          <ArrowRightIcon />
        </>
      )}
    </button>
  )
}
