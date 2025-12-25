import { useEffect, useState } from 'react'
import AddCity from './components/AddCity'
import CityList from './components/CityList'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useWeather } from './hooks/useWeather'
import type { GeocodedLocation, CityWeather } from './lib/weather'

const DEFAULT_CITIES: GeocodedLocation[] = [
  { name: 'New York', latitude: 40.7128, longitude: -74.0060, country: 'US' },
  { name: 'London', latitude: 51.5072, longitude: -0.1276, country: 'GB' },
  { name: 'Tokyo', latitude: 35.6895, longitude: 139.6917, country: 'JP' },
]

export default function App() {
  const [cities, setCities] = useLocalStorage<GeocodedLocation[]>('weather:cities', DEFAULT_CITIES)

  const { weatherMap, loading, error } = useWeather(cities)

  if (error) {
    // throw during render so the ErrorBoundary can catch API failures
    throw new Error(error)
  }

  function cityKey(c: GeocodedLocation) {
    return `${c.name}:${c.latitude.toFixed(4)}:${c.longitude.toFixed(4)}`
  }

  async function handleAdd(city: GeocodedLocation) {
    // avoid duplicates by coordinates
    if (cities.some(c => Math.abs(c.latitude - city.latitude) < 1e-4 && Math.abs(c.longitude - city.longitude) < 1e-4)) return
    setCities(prev => [city, ...prev])
  }

  function handleRemove(key: string) {
    setCities(prev => prev.filter(c => cityKey(c) !== key))
  }

  return (
    <div className="app-container">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Weather</h1>
          <p className="text-sm text-slate-500 dark:text-slate-300">Add a city to see current weather (Open-Meteo)</p>
        </div>
      </header>

      <AddCity onAdd={handleAdd} />

      <section className="mt-6">
        <h2 className="sr-only">Cities</h2>
        <CityList
          cities={cities}
          weatherMap={weatherMap}
          loading={loading}
          onRemove={handleRemove}
        />
      </section>
    </div>
  )
}
