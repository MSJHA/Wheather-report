import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState('');
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) {
      alert('Please enter a city name');
      return;
    }

    const url = `https://weather-api-by-any-city.p.rapidapi.com/weather/${city}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '52040605f8msh0fd3cdff562626fp1cccfbjsn820792bc759c',
        'x-rapidapi-host': 'weather-api-by-any-city.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      
      const temp = result.temperature || '35';
      setTemperature(`${city}'s temperature is ${temp}° Celsius`);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Unable to fetch the weather data.');
      setTemperature('');
    }
  };

  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="input-box"
      />
      <br /><br />
      <button onClick={fetchWeather} className="submit-btn">Get Weather</button>
      <div className="result-container">
        {temperature && <p>{temperature}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default App;
