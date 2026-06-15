import { useState } from "react"
import Navbar from "./components/Navbar"
import SearchBar from "./components/SearchBar"
import WeatherCard from "./components/WeatherCard"
import ForecastChart from "./components/ForecastChart"

export default function App() {
  // variables for weather, loading, and error
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // fetch data from Express server
  async function handleSearch(city) {
    setLoading(true)
    setError("")
    setWeatherData(null)

    try {
      const response = await fetch(`http://localhost:5000/weather?city=${city}`) // try to get response from backend
      const data = await response.json()

      if(!response.ok) { // request unsuccessful
        setError(data.error)
        return
      }
      setWeatherData(data)
    }catch(error) {
      console.log("Could not connect to server. Please try again.")
    } finally {
      setLoading(false)
    }
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
          <p className="text-center text-red-500 mt-6">{error}</p> 
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