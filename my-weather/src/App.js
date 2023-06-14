import React, { useState } from "react";

import './App.css';

export default function Weather(){
  const weatherData = [];
  const [weather,setWeather] = useState(Array(6).fill(null));
  const loadWeatherData = async(long,lat)=>{
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=6c46becad02bdbb43ec7948d6fb6689e`);
      const data = await res.json();
      weatherData.push(data.weather[0].description);
      weatherData.push(data.main.temp);
      weatherData.push(data.main.pressure);
      weatherData.push(data.main.humidity);
      weatherData.push(data.visibility);
      weatherData.push(data.name);
      setWeather(weatherData);
  }
  function handleSubmit(e){
    e.preventDefault(); 
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    loadWeatherData(formJson.long,formJson.lat);
  }
  return (
    <>
      <div className="container-fluid" id = "heading">
        <h1 className="display-1">Weather API</h1>
      </div>
      <div className="row">
        <form method="post" onSubmit={handleSubmit}>
          <label>
          Enter latitude : <input name ="lat" placeholder="latitude"/>
          </label>
          <label>
          Enter longitude : <input name ="long" placeholder="longitude"/>
          </label>
          <button id="subButton"type="submit">Submit</button>
        </form>
      </div>
      <div className="container" id = "heading">
        <h2>Weather Data</h2>
      </div>
      <div className="container-fluid"id = "weatherData">
        <div>
          <ul>
            <li>
              location : {weather[5]}
            </li>
            <li>
              visibility : {weather[4]}
            </li>
            <li>
              humidity : {weather[3]}
            </li>
            <li>
              pressure : {weather[2]}
            </li>
            <li>
              temperature : {weather[1]}
            </li>
            <li>
              weather Description : {weather[0]}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}