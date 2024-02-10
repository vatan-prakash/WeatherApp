// pages/index.js
"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/navbar';

const API_KEY = '07ca05f2178f2e4bd74442d75971f478';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [weatherConditions, setWeatherConditions] = useState('');
  const [windSpeed, setWindSpeed] = useState(null);
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [unit]);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('City not found. Please try again.');
      }

      const data = await response.json();
      setTemperature(data.main.temp);
      setWeatherConditions(data.weather[0].description);
      setWindSpeed(data.wind.speed);

      setRecentSearches((prevSearches) => {
        const updatedSearches = [city, ...prevSearches.slice(0, 4)];
        return [...new Set(updatedSearches)];
      });

      setError(null);
    } catch (error) {
      setTemperature(null);
      setWeatherConditions('');
      setWindSpeed(null);
      setError(error.message);
    }
  };

  const handleUnitChange = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Weather App</title>
      </Head>
      <Navbar />

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Weather App</h1>
      </header>

      {/* Main Content */}
      <main>
        <div className="mb-4">
          <label className="block mb-2">
            Search City:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border p-2 w-full"
            />
          </label>
          <button onClick={fetchWeatherData} className="bg-blue-500 text-white p-2">
            Search
          </button>
        </div>

        {/* Display weather data */}
        {error && <p className="text-red-500">{error}</p>}
        {temperature !== null && (
          <div className="mb-4">
            <p className="text-xl">
              Temperature: {temperature}°{unit === 'metric' ? 'C' : 'F'}
            </p>
            <p className="text-lg">Conditions: {weatherConditions}</p>
            <p className="text-lg">Wind Speed: {windSpeed} m/s</p>
          </div>
        )}

        {/* Unit Toggle */}
        <div className="mb-4">
          <label className="block mb-2">
            Unit:
            <button onClick={handleUnitChange} className="bg-gray-300 px-2 py-1 ml-2">
              {unit === 'metric' ? 'Celsius' : 'Fahrenheit'}
            </button>
          </label>
        </div>

        {/* Recent Searches */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Recent Searches</h2>
          <ul>
            {recentSearches.map((search, index) => (
              <li key={index} className="mb-1">{search}</li>
            ))}
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center">
        <p className="text-sm">&copy; 2024 Weather App</p>
      </footer>
    </div>
  );
};

export default WeatherApp;
