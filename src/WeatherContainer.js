import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherContainer = () => {

  const [weather, setWeather] = useState([])

  useEffect(() => {
    fetchWeather()
  }, [])

  useEffect(() => {
    console.log("IN USE EFFECT: ", weather);
    setWeather(weather)
  }, [weather])

  const fetchWeather = async () => {
    try {
      const res = await axios
      .get('https://api.openweathermap.org/data/2.5/weather?zip=10036,us&appid=709847967f5e54b97308c1b2cae4dee5');
      setWeather(res.data)
    } catch (error) {
      console.error(error.message);
    }
  }

  const tempConversion = n => Math.round(n - 273.15);

  return (
    <div>
      <div className="header">{weather.name}</div>
      <div className="description">{weather.weather && weather.weather[0].description}</div>
      <div className="temp">{weather.main && tempConversion(weather.main.temp)}<span className="degree">&deg;</span></div>
        <div className="minmax">
          <span>{tempConversion(weather.main && weather.main.temp_min)}<span className="degree">&deg;</span></span>
          <span>{tempConversion(weather.main && weather.main.temp_max)}<span className="degree">&deg;</span></span>
        </div>
      
      <div className="line" />

      <div className="zip-header">Zip Code:</div>

      <div className="buttons">
        <div className="zip-container"><span className="zip">10036</span></div>
        <button className="update" onClick={fetchWeather}>Update</button>
      </div>
    </div>
  )
}

export default WeatherContainer;
