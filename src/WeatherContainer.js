import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherContainer = () => {

  const [weather, setWeather] = useState([])

  useEffect(() => {
    fetchWeather()
  }, [])

  useEffect(() => {
    setWeather(weather)
  }, [weather])

  const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=10036,us&appid=709847967f5e54b97308c1b2cae4dee5'

  const fetchWeather = async () => {
    try {
      const res = await axios.get(baseURL);
      setWeather(res.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  let paramsString = baseURL.split("?")[1];
  let searchParams = new URLSearchParams(paramsString);
  let zipCode = searchParams.get("zip").split(",")[0];

  const tempConversion = n => Math.round(n - 273.15);

  return (
    <div>
      <div className="header">{weather.name}
        {
          weather.weather && 
          <img 
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} 
            alt="weather_icon"
          />
        }
      </div>

      <div className="description">{weather.weather && weather.weather[0].description}</div>

      <div className="temp">{weather.main && tempConversion(weather.main.temp)}
        <span className="degree">&deg;</span>
      </div>

      <div className="minmax">
        <span>{tempConversion(weather.main && weather.main.temp_min)}<span className="degree">&deg;</span></span>
        <span>{tempConversion(weather.main && weather.main.temp_max)}<span className="degree">&deg;</span></span>
      </div>
      
      <div className="line" />

      <div className="zip-header">Zip Code:</div>

      <div className="buttons">
      <div className="zip-container"><span className="zip">{zipCode}</span></div>
        <button className="update" onClick={fetchWeather}>Update</button>
      </div>
    </div>
  )
}

export default WeatherContainer;
