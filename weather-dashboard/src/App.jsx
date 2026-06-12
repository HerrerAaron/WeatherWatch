import Navbar from "./components/Navbar"
import SearchBar from "./components/SearchBar"
// import WeatherCard from "./components/WeatherCard"
// import ForecastChart from "./components/ForecastChart"

export default function App() {
  return (
    <div>

      {}
      <Navbar />

      {}
      <div className="max-w-3xl mx-auto px-4">
        {
        <SearchBar />
        // <WeatherCard />
        // <ForecastChart /> 
        }
      </div>

    </div>
  )
}