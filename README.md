# <img src="frontend/public/sun.png" width="60" alt="sun"> WeatherWatch 

**[Link to website](https://weather-watch-two.vercel.app/)**

## Features

- Search current weather conditions for any city
- 5-day forecast with weather icons
- Toggle between Celsius and Fahrenheit
- Auto-detect weather based on your current location
- Graceful error handling for invalid cities
- Loading states during data fetching
- Responsive design for mobile and desktop

## Overview

A full stack weather dashboard that delivers real-time weather conditions and 5-day forecasts for any city in the world. Built with React on the frontend and Node.js/Express on the backend.

## Tech Stack

**Frontend**
- React
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- Axios

**APIs & Deployment**
- OpenWeatherMap API
- Vercel (frontend hosting)
- Render (backend hosting)

---

## How It Works

The frontend never calls OpenWeatherMap directly — all API requests are routed through the Express backend. This keeps the API key secure and allows the backend to transform the raw response into a clean format before sending it to the frontend.

```
Browser → React Frontend (Vercel)
               ↓
         Express Backend (Render)
               ↓
         OpenWeatherMap API
```

---

## Getting Started

### Prerequisites
- Node.js installed on your machine
- A free OpenWeatherMap API key from [openweathermap.org](https://openweathermap.org)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/weatherwatch.git
cd weatherwatch
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Create a `.env` file in the `backend` folder:
```
OPENWEATHER_API_KEY=your_api_key_here
```

5. Start the backend server:
```bash
node server.js
```

6. In a separate terminal, start the frontend:
```bash
cd frontend
npm run dev
```

7. Open your browser at `http://localhost:5173`

---

## Project Structure

```
weatherwatch/
  frontend/
    src/
      components/
        Navbar.jsx
        SearchBar.jsx
        WeatherCard.jsx
        ForecastChart.jsx
      App.jsx
      index.css
      main.jsx
    package.json
    vite.config.js
    tailwind.config.js
  backend/
    server.js
    .env
    package.json
  README.md
  .gitignore
```

---

## Environment Variables

The following environment variable is required to run the backend:

| Variable | Description |
|---|---|
| `OPENWEATHER_API_KEY` | Your OpenWeatherMap API key |

---

## Deployment

The frontend is deployed on **Vercel** and the backend is deployed on **Render**. Any push to the `main` branch automatically triggers a redeployment on both platforms.

---

## License

This project is open source and available under the [MIT License](LICENSE).