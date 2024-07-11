import React, { useMemo, useState } from 'react'
import Select from 'react-select'
import { useItemsStore } from '../stores/itemsStore'
import EmptyView from './EmptyView'

const sortingOptions = [
  {
    label: 'Sort by default',
    value: 'default',
  },
  {
    label: 'Sort by packed',
    value: 'packed',
  },
  {
    label: 'Sort by unpacked',
    value: 'unpacked',
  },
]

export default function ItemList() {
  const [sortBy, setSortBy] = useState('')
  const items = useItemsStore((state) => state.items)
  const deleteItem = useItemsStore((state) => state.deleteItem)
  const toggleItem = useItemsStore((state) => state.toggleItem)

  const sortItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (sortBy === 'packed') {
          return b.packed - a.packed
        }

        if (sortBy === 'unpacked') {
          return a.packed - b.packed
        }

        return
      }),
    [items, sortBy]
  )

  return (
    <ul className="item-list">
      {items.length === 0 && <EmptyView />}

      {items.length > 0 && (
        <section className="sorting">
          <Select
            defaultValue={sortingOptions[0]}
            onChange={(option) => setSortBy(option.value)}
            options={sortingOptions}
          />
        </section>
      )}

      {sortItems.map((item) => (
        <Item
          key={item.id}
          item={item}
          onDeleteItem={deleteItem}
          onToggleItem={toggleItem}
        />
      ))}
    </ul>
  )
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li className="item">
      <label>
        <input
          type="checkbox"
          checked={item.packed}
          onChange={() => onToggleItem(item.id)}
        />
        {item.name}
      </label>

      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  )
}
