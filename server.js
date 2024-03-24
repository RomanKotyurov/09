const express = require('express')
const app = express()
const port = 3000

app.get('/hello', (req, res) => {
  res.send('Привет!')
})

app.get('/weather', async (req, res) => {
    let lat = req.query.lat
    let lon = req.query.lon
    let resWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cc27a8d46f99850e0959f18b5fe7a4b4&lang=ru`)
    let resWeatherJson = await resWeather.json()
    res.json({
        'city': resWeatherJson.name,
        'weather': resWeatherJson.weather[0].description,
        'temp': Math.round(resWeatherJson.main.temp - 273),
        'humidity': resWeatherJson.main.humidity,
        'pressure': resWeatherJson.main.pressure,
        'speed': resWeatherJson.wind.speed
    })
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})