/* 
PURPOSE: Displays 5 day forecast for city with high and low temperatures per day.
*/

// convert Celsius to Fahrenheit
function toF(c) { return Math.round(c * 9 / 5 + 32) }

export default function ForecastChart({ forecast, isCelsius, dark }) {
    const cardBg = dark ? "bg-white/10 border border-white/20 text-white" : "bg-white/70 border border-white/40"
    // blue backdrop to match WeatherCard, but lighter than its blue-600 so grey rain
    // droplets still show up against it
    const iconBg = dark ? "bg-white/20" : "bg-blue-300"

    return (
        <div className={`rounded-lg m-4 p-4 backdrop-blur-sm ${cardBg}`}>
            <h3 className="text-lg font-semibold mb-2">5-Day Forecast</h3>
            <div className="flex justify-between">
                {forecast.map((day) => (
                    <div key={day.day} className = "flex flex-col items-center gap-1">
                        <p className="text-sm font-medium">{day.day}</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                            alt="weather icon"
                            className={`${iconBg} rounded-full w-14 h-14`}
                        />
                        <p className="text-sm font-bold">{isCelsius ? day.high : toF(day.high)}°</p>
                        <p className={`text-sm ${dark ? "text-white/60" : "text-gray-500"}`}>{isCelsius ? day.low : toF(day.low)}°</p>
                    </div>
                ))}
            </div>
        </div>
    )
}