/*PURPOSE: Create the server that front-end will call. Back-end fetches
weather data using OpenWeather API.*/

require("dotenv").config()
const express = require("express")
const axios = require("axios")
const cors = require("cors")

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.get("/weather", async (req, res) => { // endpoint
    const { city } = req.query

    if (!city) { // no city given
        return res.status(400).json({ error: "City is required." }) // 400 = bad request
    }

    // City is provided. Either city exists so we return weather data
    // or city doesn't exist and we provide error message
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY

        // get weather data from city
        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        )
        const forecastResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        )

        const weather = weatherResponse.data
        const forecast = forecastResponse.data

        // format forecast properly before returning to front end
        const dailyMap = {}
        forecast.list.forEach((item) => {
            const day = new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })
            if (!dailyMap[day]) dailyMap[day] = { highs: [], lows: [] }
            dailyMap[day].highs.push(item.main.temp_max)
            dailyMap[day].lows.push(item.main.temp_min)
        })

        const formattedForecast = Object.entries(dailyMap)
            .slice(0, 5)
            .map(([day, { highs, lows }]) => ({
                day,
                high: Math.round(Math.max(...highs)),
                low: Math.round(Math.min(...lows)),
            }))

        res.json({
            city: weather.name,
            country: weather.sys.country,
            temperature: Math.round(weather.main.temp),
            condition: weather.weather[0].description,
            humidity: weather.main.humidity,
            wind: Math.round(weather.wind.speed),
            forecast: formattedForecast
        })
    } catch (error) {
        if (error.response?.status === 404) { // 404 = not found
            res.status(404).json({ error: "City not found. Please try gain." })
        } else { // 500 = server error
            res.status(500).json({ error: "Something went wrong. Please try again." })
        }
    }
})

app.listen(PORT) // start the server
