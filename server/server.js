const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

const API_KEY = '31b0a3dd1468ebf26152d8f7e46d9d01';

app.get('/weather', async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    // Extract first forecast (you can enhance to get more)
    const currentForecast = response.data.list[0];

    const result = {
      city: response.data.city.name,
      temperature: currentForecast.main.temp,
      description: currentForecast.weather[0].description,
      humidity: currentForecast.main.humidity,
      windSpeed: currentForecast.wind.speed,
    };

    res.json(result);
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
