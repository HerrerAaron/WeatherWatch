/* 
PURPOSE: Displays current weather (i.e. temperature, humidity,
wind condition) for the searched city.
*/

// convert Celsius to Fahrenheit
function toF(c) { return Math.round(c * 9 / 5 + 32) }

export default function WeatherCard({ city, province, country, temperature, condition, humidity, wind, icon, isCelsius, dark }) {
    const displayTemp = isCelsius ? temperature : Math.round(toF(temperature))
    const unit = isCelsius ? "°C" : "°F"
    const cardBg = dark ? "bg-white/10 border-white/20 text-white" : "bg-white/70 border-white/40"

    return (
        <div className={`border rounded-lg p-6 m-4 shadow backdrop-blur-sm ${cardBg}`}>
            <h2 className="text-2xl font-bold">{city}{province ? `, ${province}` : ""}, {country}</h2>
            <div className="flex items-center gap-2 my-4">
                {icon && (
                    <img
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt={condition}
                    className = "w-16 h-16"
                    />
                )}
                <p className="text-5xl my-4">{displayTemp}{unit}</p>
            </div>

            <p className={`capitalize ${dark ? "text-white/70" : "text-gray-500"}`}>{condition}</p>

            <div className={`flex gap-6 mt-4 text-sm ${dark ? "text-white/70" : "text-gray-600"}`}>
                <span>Humidity: {humidity}%</span>
                <span>Wind: {wind} km/h</span>
            </div>
        </div>
    )
}
