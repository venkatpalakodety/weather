import { useState } from 'react'
import { geocodeCity } from '../lib/weather'
import type { GeocodedLocation } from '../lib/weather'

export default function AddCity({ onAdd }: { onAdd: (c: GeocodedLocation) => void }) {
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!q.trim()) return
    setLoading(true)
    setError(null)
    try {
      const found = await geocodeCity(q.trim())
      if (!found) {
        setError('City not found')
      } else {
        onAdd(found)
        setQ('')
      }
    } catch (err) {
      setError('Lookup failed')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-center">
      <div className="flex-1 relative">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          className="w-full rounded-full border border-white/20 bg-white/8 text-black placeholder:text-black/60 px-4 py-2 shadow-inner"
          placeholder="Add city name (e.g. San Francisco)"
        />
      </div>
      <button className="rounded-full bg-white/10 text-white px-4 py-2 hover:bg-white/20" disabled={loading}>
        {loading ? 'Adding…' : 'Add'}
      </button>
      {error && <div className="text-sm text-rose-300 ml-2">{error}</div>}
    </form>
  )
}
