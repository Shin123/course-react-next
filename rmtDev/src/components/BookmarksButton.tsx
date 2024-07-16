import { TriangleDownIcon } from '@radix-ui/react-icons'
import { useRef, useState } from 'react'
import { useOnClickOutSide } from '../lib/hooks'
import BookmarksPopover from './BookmarksPopover'

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false)

  const buttonRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  useOnClickOutSide([buttonRef, popoverRef], () => setIsOpen(false))

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
