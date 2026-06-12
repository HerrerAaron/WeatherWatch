import { useState } from "react"
import Navbar from "./components/Navbar"
import SearchBar from "./components/SearchBar"
import WeatherCard from "./components/WeatherCard"
import ForecastChart from "./components/ForecastChart"

// hardcoded fake data
const fakeWeatherData = {
  city: "Winnipeg",
  temperature: 18,
  humidity: 60,
  condition: "Mostly cloudy",
  wind: 10,
  forecast: [
    { day: "Mon", high: 22, low: 14 },
    { day: "Tue", high: 19, low: 12 },
    { day: "Wed", high: 24, low: 15 },
    { day: "Thu", high: 21, low: 13 },
    { day: "Fri", high: 17, low: 11 },
  ]
}

export default function App() {
  // variables for weather, loading, and error
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // simulating API call for city found and city not found
  function handleSearch(city) {
    setLoading(true)
    setError("")

    setTimeout(() => {
      if (city.toLowerCase() == "") {
        setError("City not found. Please try again.")
        setWeatherData(null)
      } else {
        setWeatherData(fakeWeatherData)
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4">

        {/* This is how SearchBar passes inputted city to 
        handleSearch() in this function. */}
        <SearchBar onSearch={handleSearch} /> 
      
        {/*There is a delay between loading being true and checking
        if city is valid */}
        {loading && (
          <p className="text-center text-gray-500 mt-6">Loading...</p>
        )}

        {error && (
          <p className="text-center text-red-500 mt-6">{error}</p> // in brackets due to specific error message we want
        )}

        {weatherData && !loading && (
          <>
            <WeatherCard {...weatherData} />
            <ForecastChart forecast={weatherData.forecast} />
          </>
        )}

      </div>
    </div>
  )
}