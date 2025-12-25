# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
## Weather App (Vite + React + TypeScript)

This project is a weather app using React + TypeScript + Vite. It uses the free Open-Meteo APIs (no API key required) and Tailwind CSS for responsive styling.

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

