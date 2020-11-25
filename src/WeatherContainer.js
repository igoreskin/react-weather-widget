import React from 'react';

const WeatherContainer = () => {
  return (
    <div>
      <div className="header">New York</div>
      <div className="description">Scattered Thundershowers</div>
      <div className="temp">16<span className="degree">&deg;</span></div>
        <div className="minmax">
          <span>6<span className="degree">&deg;</span></span>
          <span>22<span className="degree">&deg;</span></span>
        </div>
      
      <div className="line" />

      <div className="zip-header">Zip Code:</div>

      <div className="buttons">
        <div className="zip-container"><span className="zip">10036</span></div>
        <button className="update">Update</button>
      </div>
    </div>
  )
}

export default WeatherContainer;
