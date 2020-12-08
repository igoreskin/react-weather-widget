import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const WeatherContainer = () => {

  const [weather, setWeather] = useState([]);
  const [zip, setZip] = useState('10036');
  const [error, setError] = useState(false);
  const [notification, setNotification] = useState(false);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    fetchWeather();
    inputRef.current.focus();
  }, [])

  useEffect(() => {
    setWeather(weather);
    inputRef.current.focus();
  }, [weather])

  useEffect(() => {
    setAnimate(true);
  }, [animate])

  const inputRef = useRef(null);

  const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=709847967f5e54b97308c1b2cae4dee5`;

  const fetchWeather = async () => {
    try {
      const res = await axios.get(baseURL);
      setWeather(res.data);
      setError(false);
      setNotification(false);
    } catch (error) {
      console.error("ERROR MESSAGE: ", error.message);
      setError(true);
      setTimeout(() => {
        setNotification(true)
      }, 3500)
      setZip('');
      inputRef.current.focus();
    }
  }

  const handleChange = e => {
    setZip(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    setAnimate(false); 
    fetchWeather();
  }

  const clearZip = () => {
    setZip('');
  }

  const tempConversion = n => Math.round(n - 273.15);

  const addClass = !error && animate && "animate__animated animate__backInDown";

  return (
    <div>
      <div className={`header ${addClass}`}>{weather.name}
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

        <form className="buttons" onSubmit={handleSubmit}>
          <input type="text" ref={inputRef} className="zip-container" value={zip || ''} onChange={handleChange} onClick={clearZip} />
          <button className="update" type="submit">Update</button>
        </form>

        {/* {error && <div className="error animate__animated animate__flash">Please enter a valid zip code!</div>} */}

        {error && <div style={{fontSize: "150%"}} className="error animate__animated animate__bounceInDown">If you think that was a zip code... </div>}
        {notification && <div style={{fontSize: "200%", marginTop: "-2px"}} className="error animate__animated animate__zoomIn">THINK AGAIN!</div>}
    </div>
  )
}

export default WeatherContainer;
