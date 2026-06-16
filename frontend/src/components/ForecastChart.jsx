/* 
PURPOSE: Displays 5 day forecast for city with high and low temrpetures per day.
*/

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

// convert Celsius to Fahrenheit
function toF(c) { return Math.round(c * 9 / 5 + 32) }

export default function ForecastChart({ forecast, isCelsius, dark }) {
    const cardBg = dark ? "bg-white/10 border border-white/20 text-white" : "bg-white/70 border border-white/40"

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
                            className="bg-blue-600 rounded-full w-10 h-10"
                        />
                        <p className="text-sm font-bold">{isCelsius ? day.high : toF(day.high)}°</p>
                        <p className={`text-sm ${dark ? "text-white/60" : "text-gray-500"}`}>{isCelsius ? day.low : toF(day.low)}°</p>
                    </div>
                ))}
            </div>
        </div>
    )
}