import { TriangleDownIcon } from '@radix-ui/react-icons'
import BookmarksPopover from './BookmarksPopover'
import { useEffect, useRef, useState } from 'react'

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false)

  const buttonRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        !e.target.closest('.bookmarks-btn') &&
        !e.target.closest('.bookmarks-popover')
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
  return (
    <section>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="bookmarks-btn"
      >
        Bookmarks <TriangleDownIcon />
      </button>
      {isOpen && <BookmarksPopover ref={popoverRef} />}
    </section>
  )
}
