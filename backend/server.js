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

    // normalize "City, State, Country" → "City,State,Country" for OpenWeather
    const query = city.split(",").map((s) => s.trim()).join(",")

    // City is provided. Either city exists so we return weather data
    // or city doesn't exist and we provide error message
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY

        // step 1: geocode the query to lat/lon — this respects province/state codes for all countries
        const geoResponse = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${apiKey}`
        )
        if (!geoResponse.data.length) {
            return res.status(404).json({ error: "City not found. Please try again." })
        }
        const { lat, lon, state: province } = geoResponse.data[0]

        // step 2: fetch weather and forecast using coordinates
        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        )
        const forecastResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        )

        const weather = weatherResponse.data
        const forecast = forecastResponse.data

        // format forecast properly before returning to front end
        const dailyMap = {}
        forecast.list.forEach((item) => {
            const date = new Date(item.dt * 1000)
            const day = date.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" })
            const hour = date.getUTCHours()
            if (!dailyMap[day]) dailyMap[day] = { highs: [], lows: [], icon: item.weather[0].icon, iconHour: hour }
            dailyMap[day].highs.push(item.main.temp_max)
            dailyMap[day].lows.push(item.main.temp_min)
            
            // prefer the slot closest to midday so we get a daytime icon
            if (Math.abs(hour - 12) < Math.abs(dailyMap[day].iconHour - 12)) {
                dailyMap[day].icon = item.weather[0].icon
                dailyMap[day].iconHour = hour
            }
        })

        const formattedForecast = Object.entries(dailyMap)
            .slice(0, 5)
            .map(([day, { highs, lows, icon }]) => ({
                day,
                high: Math.round(Math.max(...highs)),
                low: Math.round(Math.min(...lows)),
                icon
            }))

        const countryCode = weather.sys.country // country code
        const regions = new Intl.DisplayNames(['en'], {type: 'region'})
        const fullCountry = regions.of(countryCode) // convert to full country name

        res.json({
            city: weather.name,
            province: province || null, // province/state from geocoding, not always present
            country: fullCountry,
            temperature: Math.round(weather.main.temp),
            condition: weather.weather[0].description,
            humidity: weather.main.humidity,
            wind: Math.round(weather.wind.speed),
            icon: weather.weather[0].icon,
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
