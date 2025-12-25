import CityCard from './CityCard'
import type { GeocodedLocation, CityWeather } from '../lib/weather'

export default function CityList({ cities, weatherMap, loading, onRemove }: {
  cities: GeocodedLocation[],
  weatherMap: Record<string, CityWeather>,
  loading: boolean,
  onRemove: (key: string) => void
}) {
  function cityKey(c: GeocodedLocation) {
    return `${c.name}:${c.latitude.toFixed(4)}:${c.longitude.toFixed(4)}`
  }

  if (cities.length === 0) return <div className="text-sm text-slate-500">No cities added.</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {cities.map(c => (
        <CityCard key={cityKey(c)} city={c} weather={weatherMap[cityKey(c)]} onRemove={onRemove} />
      ))}
      {loading && <div className="p-4 text-sm text-slate-500">Refreshing weather…</div>}
    </div>
  )
}
