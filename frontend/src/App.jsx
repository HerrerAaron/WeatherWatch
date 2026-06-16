import { useState } from "react"
import Navbar from "./components/Navbar"
import SearchBar from "./components/SearchBar"
import SearchHistory from "./components/SearchHistory"
import WeatherCard from "./components/WeatherCard"
import ForecastChart from "./components/ForecastChart"

export default function App() {
  // variables for weather, loading, and error
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isCelsius, setIsCelsius] = useState(true) // default is Celsius
  const [searchHistory, setSearchHistory] = useState([]) // last 5 searched cities

  // add a query to the front of history, deduplicating and capping at 5
  function addToHistory(query) {
    setSearchHistory((prev) => [query, ...prev.filter((q) => q !== query)].slice(0, 5))
  }

  // fetch weather by city name from Express server
  async function handleSearch(city) {
    setLoading(true)
    setError("")
    setWeatherData(null)

    try {
      const response = await fetch(`http://localhost:5000/weather?city=${encodeURIComponent(city)}`) // try to get response from backend
      const data = await response.json()

      if(!response.ok) { // request unsuccessful
        setError(data.error)
        return
      }
      setWeatherData(data)
      addToHistory(city)
    }catch(error) {
      console.log("Could not connect to server. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // fetch weather using browser geolocation
  function handleLocationSearch() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.")
      return
    }
    setLoading(true)
    setError("")
    setWeatherData(null)

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const response = await fetch(`http://localhost:5000/weather?lat=${coords.latitude}&lon=${coords.longitude}`)
          const data = await response.json()
          if (!response.ok) {
            setError(data.error)
            return
          }
          setWeatherData(data)
          // store resolved city name so the history button re-searches by name
          const label = [data.city, data.province, data.country].filter(Boolean).join(", ")
          addToHistory(label)
        } catch (error) {
          setError("Could not connect to server. Please try again.")
        } finally {
          setLoading(false)
        }
      },
      () => { // user denied or location unavailable
        setError("Unable to retrieve your location.")
        setLoading(false)
      }
    )
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4">

        {/* This is how SearchBar passes inputted city to 
        handleSearch() in this function. */}
        <SearchBar onSearch={handleSearch} onLocationSearch={handleLocationSearch} />
        <SearchHistory history={searchHistory} onSelect={handleSearch} />

        {loading && (
          <p className="text-center text-gray-500 mt-6">Loading...</p>
        )}

        {error && (
          <p className="text-center text-red-500 mt-6">{error}</p> 
        )}

        {weatherData && !loading && (
          <>
            <div className="flex justify-end px-4">
              <button
                onClick={() => setIsCelsius(!isCelsius)}
                className="text-sm px-3 py-1 rounded border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
              >
                Switch to {isCelsius ? "°F" : "°C"}
              </button>
            </div>
            <WeatherCard {...weatherData} isCelsius={isCelsius} />
            <ForecastChart forecast={weatherData.forecast} isCelsius={isCelsius} />
          </>
        )}

      </div>
    </div>
  )
}