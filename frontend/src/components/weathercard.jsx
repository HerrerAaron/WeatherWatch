/* 
PURPOSE: Displays current weather (i.e. temperature, humidity,
wind condition) for the searched city.
*/

export default function WeatherCard({city, temperature, condition, humidity, wind}) {
    return (
        <div className="border rounded-lg p-6 m-4 shadow">
            <h2 className = "text-2xl font-bold">{city}</h2>
            <p className="text-5xl my-4">{temperature}°C</p>
            <p className="text-gray-500">{condition}</p>
            <div className="flex gap-6 mt-4 text-sm text-gray-600">
                <span>Humidity: {humidity}%</span>
                <span>Wind: {wind} km/h</span>
            </div>
        </div>
    )
}
