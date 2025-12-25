import { weatherCodeToText, weatherCodeToIcon } from '../lib/weather'
import type { CityWeather, GeocodedLocation } from '../lib/weather'

export default function CityCard({ city, weather, onRemove }: { city: GeocodedLocation, weather?: CityWeather, onRemove: (key: string) => void }) {
  const key = `${city.name}:${city.latitude.toFixed(4)}:${city.longitude.toFixed(4)}`

  return (
    <div className="p-4 rounded-2xl glass shadow-lg border border-white/10">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-lg font-medium">{city.name}{city.country ? `, ${city.country}` : ''}</div>
          <div className="text-xs text-white/70">{city.latitude.toFixed(2)}, {city.longitude.toFixed(2)}</div>
        </div>
        <div className="text-right">
          <button onClick={() => onRemove(key)} className="text-sm text-white/70 hover:text-white">Remove</button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-6xl leading-none">{weather ? weatherCodeToIcon(weather.weathercode) : '❔'}</div>
          <div>
            <div className="text-4xl font-extrabold leading-none">{weather ? Math.round(weather.temperature) : '--'}°</div>
            <div className="text-sm text-white/80">{weather ? weatherCodeToText(weather.weathercode) : 'Weather unavailable'}</div>
          </div>
        </div>
        <div className="text-sm text-white/60 text-right">
          {weather?.time ? new Date(weather.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null}
        </div>
      </div>
    </div>
  )
}
