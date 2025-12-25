# Weather App (Vite + React + TypeScript)


```js
## Weather App (Vite + React + TypeScript)

This is a weather app using React + TypeScript + Vite. It uses the free Open-Meteo APIs (no API key required) and Tailwind CSS for responsive styling.

Features:
- List a set of cities with current weather
- Add any city by name (uses Open-Meteo Geocoding)
- Persist cities in `localStorage`

Quick start

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

Notes about Tailwind

- This repository includes `tailwind.config.cjs` and `postcss.config.cjs`. Tailwind is wired via PostCSS and will work with Vite once dependencies are installed.

APIs used

- Geocoding: `https://geocoding-api.open-meteo.com`
- Current weather: `https://api.open-meteo.com`

