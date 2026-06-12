import Navbar from "./components/Navbar"
import SearchBar from "./components/SearchBar"
import WeatherCard from "./components/WeatherCard"
import ForecastChart from "./components/ForecastChart"

const weatherData = { // hardcoded data values
  city:"Winnipeg",
  temperature:18,
  humidity:60,
  condition:"Mostly cloudy",
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
  return (
    <div>
      { }
      <Navbar />
      { }
      <div className="max-w-3xl mx-auto px-4">
        <SearchBar />
        <WeatherCard {...weatherData}/> 
        <ForecastChart forecast={weatherData.forecast}/>
      </div>
    </div>
  )
}