import React, { useState } from 'react'
import Dropdown from './Dropdown'

export default ({ item: defaultItem, onSelect, ...props }) => {
  const [item, setItem] = useState(defaultItem)

  return (
    <Dropdown
      item={item} 
      onSelect={(value) => {
        setItem(value)
        onSelect(value)
      }}
      {...props}
    />
  )
}