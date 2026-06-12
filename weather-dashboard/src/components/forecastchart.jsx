/* 
PURPOSE: Displays 5 day forecast for city with high and low temrpetures per day.
*/

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

export default function ForecastChart({ forecast }) {
    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">5-Day Forecast</h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={forecast} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>

                    <XAxis dataKey="day" />
                    <YAxis domain={[dataMin => Math.min(0,dataMin), 'auto']}/>

                    <Tooltip />

                    <Bar dataKey="high" fill="#3B82F6" name="High"
                        label={{ position: "top", fontSize: 12 }} />
                    <Bar dataKey="low" fill="#93C5FD" name="Low"
                        label={{ position: "top", fontSize: 12 }} />

                    {/* adds line at 0 degrees for easier distinction */}
                    <ReferenceLine y={0} stroke="#000" strokeWidth={2} ifOverflow="extendDomain"/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}