import React from 'react'
import { useItemsStore } from '../stores/itemsStore'
import Button from './Button'

export default function ButtonGroup() {
  const markAllAsComplete = useItemsStore((state) => state.markAllAsComplete)
  const markAllAsInComplete = useItemsStore(
    (state) => state.markAllAsInComplete
  )
  const resetToInitial = useItemsStore((state) => state.resetToInitial)
  const removeAllItems = useItemsStore((state) => state.removeAllItems)

  const secondaryButtons = [
    {
      text: 'Mark all as complete',
      onClick: markAllAsComplete,
    },
    {
      text: 'Mark all as incomplete',
      onClick: markAllAsInComplete,
    },
    {
      text: 'Reset to initial',
      onClick: resetToInitial,
    },
    {
      text: 'Remove all items',
      onClick: removeAllItems,
    },
  ]

  return (
    <section className="button-group">
      {secondaryButtons.map(({ text, onClick }) => (
        <Button
          key={text + onClick.toString()}
          buttonType="secondary"
          onClick={onClick}
        >
          {text}
        </Button>
      ))}
    </section>
  )
}
