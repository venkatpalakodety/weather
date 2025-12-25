import { useEffect, useState } from 'react'
import { fetchWeatherForCity } from '../lib/weather'
import type { GeocodedLocation, CityWeather } from '../lib/weather'

function cityKey(c: GeocodedLocation) {
  return `${c.name}:${c.latitude.toFixed(4)}:${c.longitude.toFixed(4)}`
}

export function useWeather(cities: GeocodedLocation[]) {
  const [weatherMap, setWeatherMap] = useState<Record<string, CityWeather>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function loadAll() {
      setLoading(true)
      setError(null)
      const next: Record<string, CityWeather> = {}
      let anySuccess = false
      try {
        for (const c of cities) {
          try {
            const w = await fetchWeatherForCity(c.latitude, c.longitude)
            next[cityKey(c)] = w
            anySuccess = true
          } catch (err) {
            // skip individual city failures
          }
        }
        if (!anySuccess && cities.length > 0) {
          setError('Failed to fetch weather data for all cities')
        }
      } catch (err) {
        setError((err as Error)?.message ?? 'Failed to fetch weather')
      }
      if (mounted) setWeatherMap(next)
      setLoading(false)
    }
    loadAll()
    return () => { mounted = false }
  }, [cities])

  return { weatherMap, loading, error }
}
