/* 
PURPOSE: Displays 5 day forecast for city with high and low temrpetures per day.
*/

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ForecastChart({forecast}) {
    return(
        <div className="p-4">
            <h3 className = "text-lg font-semibold mb-2">5-Day Forecast</h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={forecast}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="high" fill="#3B82F6" name="High" />
                    <Bar dataKey="low" fill = "93C5FD" name="Low" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}