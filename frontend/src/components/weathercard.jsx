/* 
PURPOSE: Displays current weather (i.e. temperature, humidity,
wind condition) for the searched city.
*/

export default function WeatherCard({ city, country, temperature, condition, humidity, wind, icon }) {
    return (
        <div className="border rounded-lg p-6 m-4 shadow">
            <h2 className="text-2xl font-bold">{city}, {country}</h2>
            <div className="flex items-center gap-2 my-4">
                {icon && (
                    <img
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt={condition}
                    className = "w-16 h-16"
                    />
                )}
                <p className="text-5xl my-4">{temperature}°C</p>
            </div>

            <p className="text-gray-500 capitalize">{condition}</p>

            <div className="flex gap-6 mt-4 text-sm text-gray-600">
                <span>Humidity: {humidity}%</span>
                <span>Wind: {wind} km/h</span>
            </div>
        </div>
    )
}
