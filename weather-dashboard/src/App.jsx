import Navbar from "./components/Navbar"
import SearchBar from "./components/SearchBar"
import WeatherCard from "./components/WeatherCard"
// import ForecastChart from "./components/ForecastChart"

export default function App() {
  return (
    <div>
      {}
      <Navbar />
      {}
      <div className="max-w-3xl mx-auto px-4">
        <SearchBar />
        <WeatherCard // hard coded values for testing. backend not made yet
        city = "Winnipeg"
        temperature = {22}
        humidity = {60}
        condition = "Partly cloudy"
        />
        {/* <ForecastChart />   */}
      </div>
    </div>
  )
}