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

const regions = new Intl.DisplayNames(['en'], { type: 'region' })

// common state/province postal abbreviations -> full name, so "ON" resolves to "Ontario"
// (OpenWeather's geocoder only resolves abbreviations when given as part of a strict
// "city,state,country" query, not when the country is omitted)
const STATE_ABBREVIATIONS = {
    AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California", CO: "Colorado",
    CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho",
    IL: "Illinois", IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana",
    ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota",
    MS: "Mississippi", MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada",
    NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina",
    ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania",
    RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee", TX: "Texas",
    UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West Virginia",
    WI: "Wisconsin", WY: "Wyoming",
    AB: "Alberta", BC: "British Columbia", MB: "Manitoba", NB: "New Brunswick",
    NL: "Newfoundland and Labrador", NS: "Nova Scotia", NT: "Northwest Territories",
    NU: "Nunavut", ON: "Ontario", PE: "Prince Edward Island", QC: "Quebec",
    SK: "Saskatchewan", YT: "Yukon"
}

// does a typed qualifier (e.g. "ON", "Ontario", "Canada", "CA") match this geocoding candidate's
// state or country, whether typed as a code or a full name
function qualifierMatches(qualifier, candidate) {
    const q = qualifier.toLowerCase()
    const countryFull = regions.of(candidate.country) || ""
    if (candidate.country.toLowerCase() === q) return true
    if (countryFull.toLowerCase() === q) return true
    if (candidate.state && candidate.state.toLowerCase() === q) return true
    const abbrFull = STATE_ABBREVIATIONS[qualifier.toUpperCase()]
    if (abbrFull && candidate.state && candidate.state.toLowerCase() === abbrFull.toLowerCase()) return true
    return false
}

app.get("/weather", async (req, res) => { // endpoint
    const { city, lat, lon } = req.query

    if (!city && (!lat || !lon)) { // no city or coordinates given
        return res.status(400).json({ error: "City or coordinates are required." }) // 400 = bad request
    }

    // City or coordinates provided. Either it exists so we return weather data
    // or it doesn't exist and we provide error message
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY

        let coords, province = null, geoCity = null, geoCountry = null

        if (lat && lon) {
            // coordinates provided directly (e.g. from browser geolocation)
            coords = { lat, lon }
        } else {
            // split "City, State/Prov, Country" into the city and any qualifiers
            const [cityTerm, ...qualifiers] = city.split(",").map((s) => s.trim()).filter(Boolean)

            // geocode by city name only — OpenWeather's own state/country parsing only works
            // for strict "city,state,country" queries, so we fetch all same-named candidates
            // and filter by qualifier ourselves to also support "City, State" or "City, Country"
            const geoResponse = await axios.get(
                `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityTerm)}&limit=10&appid=${apiKey}`
            )

            // OpenWeather can match on a local-language name that bears no resemblance to
            // what was typed (e.g. "m" matching Belarusian Rahachow), so only accept a
            // result whose name is an exact (case-insensitive) match for the typed city,
            // and whose state/country (if any were typed) match too
            const match = geoResponse.data.find((entry) =>
                entry.name.toLowerCase() === cityTerm.toLowerCase() &&
                qualifiers.every((q) => qualifierMatches(q, entry))
            )

            if (!match) {
                return res.status(404).json({ error: "City not found. Please try again." })
            }
            const { lat: geoLat, lon: geoLon, state: geoProvince } = match
            coords = { lat: geoLat, lon: geoLon }
            province = geoProvince || null
            // use the geocoding match's own name, not the weather endpoint's — that endpoint
            // resolves to the nearest weather station, which is often a neighbourhood
            // (e.g. searching "Tokyo" can come back as "Marunouchi")
            geoCity = match.name
            geoCountry = regions.of(match.country)
        }

        // fetch weather and forecast using coordinates
        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`
        )
        const forecastResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`
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

        // prefer the geocoded city/country (from the typed search) over the weather endpoint's,
        // which resolves to the nearest weather station and is often a neighbourhood name
        const displayCity = geoCity || weather.name
        const displayCountry = geoCountry || regions.of(weather.sys.country)

        // fill in json template
        res.json({
            city: displayCity,
            province: province || null, // province/state from geocoding, not always present
            country: displayCountry,
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
