const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

router.get("/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!city) {
    return res.status(400).json({ error: "City name is required." });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = response.data;
    const result = {
      city: data.name,
      temperature: data.main.temp,
      condition: data.weather[0].main,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data." });
  }
});

module.exports = router;
