import React, { useMemo, useState } from 'react'
import { initialItems } from '../lib/constants'
import EmptyView from './EmptyView'
import Select from 'react-select'

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

export default function ItemList({
  items,
  handleDeleteItem,
  handleToggleItem,
}) {
  const [sortBy, setSortBy] = useState('')

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
          handleDeleteItem={handleDeleteItem}
          handleToggleItem={handleToggleItem}
        />
      ))}
    </ul>
  )
}

function Item({ item, handleDeleteItem, handleToggleItem }) {
  return (
    <li className="item">
      <label>
        <input
          type="checkbox"
          checked={item.packed}
          onChange={() => handleToggleItem(item.id)}
        />
        {item.name}
      </label>

      <button onClick={() => handleDeleteItem(item.id)}>❌</button>
    </li>
  )
}
