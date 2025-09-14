import React, {useEffect, useState} from 'react'
import {PatchEvent, set} from 'sanity'

function SongSelector({onChange, value = [], type}) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)
        
        // For now, you'll need to replace this URL with your deployed app URL
        // If your main app is deployed, replace 'your-deployed-app-url.com' with the actual URL
        const API_URL = process.env.SANITY_STUDIO_API_URL || 'http://localhost:5173'
        const response = await fetch(`${API_URL}/data`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`)
        }
        
        const data = await response.json()
        setItems(data[type] || [])
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(error.message)
      } finally {
        setLoading(false)
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

  if (loading) {
    return (
      <div>
        <h3>Featured {type.charAt(0).toUpperCase() + type.slice(1)}</h3>
        <p>Loading {type}...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h3>Featured {type.charAt(0).toUpperCase() + type.slice(1)}</h3>
        <p style={{color: 'red'}}>Error: {error}</p>
      </div>
    )
  }

  return (
    <div>
      <h3>Featured {type.charAt(0).toUpperCase() + type.slice(1)} ({items.length} available)</h3>
      {items.length === 0 ? (
        <p>No {type} found in database.</p>
      ) : (
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', maxHeight: '300px', overflowY: 'auto'}}>
          {items.map((item) => (
            <label key={item.id} style={{display: 'block', padding: '5px', border: '1px solid #ccc', borderRadius: '3px'}}>
              <input
                type="checkbox"
                checked={value.includes(item.id)}
                onChange={() => handleSelection(item.id)}
                style={{marginRight: '5px'}}
              />
              {item.name}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export default SongSelector
