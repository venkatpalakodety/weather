export type GeocodedLocation = {
  name: string
  latitude: number
  longitude: number
  country?: string
}

export type CityWeather = {
  temperature: number
  windspeed?: number
  winddirection?: number
  weathercode?: number
  time?: string
}

export async function geocodeCity(name: string): Promise<GeocodedLocation | null> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1&language=en&format=json`;
  const res = await fetch(url)
  if (!res.ok) return null
  const data = await res.json()
  if (!data.results || data.results.length === 0) return null
  const r = data.results[0]
  return { name: r.name, latitude: r.latitude, longitude: r.longitude, country: r.country }
}

export async function fetchWeatherForCity(lat: number, lon: number): Promise<CityWeather> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed fetching weather')
  const data = await res.json()
  if (!data.current_weather) throw new Error('No weather data')
  const cw = data.current_weather
  return {
    temperature: cw.temperature,
    windspeed: cw.windspeed,
    winddirection: cw.winddirection,
    weathercode: cw.weathercode,
    time: cw.time,
  }
}

export function weatherCodeToText(code?: number) {
  const map: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Snow fall',
    80: 'Rain showers',
    95: 'Thunderstorm',
  }
  if (code == null) return 'Unknown'
  return map[code] ?? `Weather ${code}`
}

export function weatherCodeToIcon(code?: number) {
  // Simple emoji mapping to give an iOS-like icon feel without external assets
  const map: Record<number, string> = {
    0: '☀️',
    1: '🌤️',
    2: '⛅',
    3: '☁️',
    45: '🌫️',
    48: '🌫️',
    51: '🌦️',
    53: '🌦️',
    55: '🌧️',
    61: '🌧️',
    63: '🌧️',
    65: '🌧️',
    71: '❄️',
    80: '🌦️',
    95: '⛈️',
  }
  if (code == null) return '❔'
  return map[code] ?? '🌈'
}
