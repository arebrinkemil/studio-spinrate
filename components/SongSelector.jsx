import React, {useEffect, useState} from 'react'
import {PatchEvent, set} from 'sanity'

function SongSelector({onChange, value = [], type}) {
  const [items, setItems] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5173/data')
        const data = await response.json()
        setItems(data[type] || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [type])

  const handleSelection = (id) => {
    const updatedSelection = value.includes(id)
      ? value.filter((itemId) => itemId !== id)
      : [...value, id]

    onChange(PatchEvent.from(set(updatedSelection)))
  }

  return (
    <div>
      <h3>Featured {type.charAt(0).toUpperCase() + type.slice(1)}</h3>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
        {items.map((item) => (
          <label key={item.id}>
            <input
              type="checkbox"
              checked={value.includes(item.id)}
              onChange={() => handleSelection(item.id)}
            />
            {item.name}
          </label>
        ))}
      </div>
    </div>
  )
}

export default SongSelector
