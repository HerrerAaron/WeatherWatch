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
        const formattedForecast = forecast.list
            .filter((_, index) => index % 8 === 0) // only keep 8th item (i.e. every 24 hours)
            .map((item) => ({
                day: new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" }),
                high: Math.round(item.main.temp_max),
                low: Math.round(item.main.temp_min),
            }))

        res.json({
            city: weather.name,
            temperature: Math.round(weather.main.temp),
            humidity: weather.wind.humidity,
            wind: Math.round(weather.main.speed),
            condition: weather.weather[0].description,
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
