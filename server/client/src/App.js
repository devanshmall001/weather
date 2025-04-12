import React, { useState } from "react";
import "./App.css";

const API_KEY = "31b0a3dd1468ebf26152d8f7e46d9d01";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    const trimmedCity = city.trim(); // Remove extra spaces
    if (!trimmedCity) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(trimmedCity)}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
        setError("");
      } else {
        setWeather(null);
        setError(data.message || "City not found");
      }
    } catch (err) {
      setWeather(null);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className="container">
      <h1>🌦️ Weather App</h1>

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div className="card">
          <div className="location">
            {weather.name}, {weather.sys.country}
          </div>
          <div className="temp">{Math.round(weather.main.temp)}°C</div>
          <div className="description">
            {weather.weather[0].description}
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
          <div className="details">
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
            <p>Feels Like: {Math.round(weather.main.feels_like)}°C</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
