import React, { useState } from 'react'
import { initialItems } from '../lib/constants'

export default function ItemList({
  items,
  handleDeleteItem,
  handleToggleItem,
}) {
  return (
    <ul>
      {items.map((item) => (
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
        />{' '}
        {item.name}
      </label>

      <button onClick={() => handleDeleteItem(item.id)}>❌</button>
    </li>
  )
}
