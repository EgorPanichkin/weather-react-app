import './App.css';
import React, { useState, useEffect} from 'react'
import axios from 'axios';
import Header from './components/Header/Header';
import Weather from './components/Weather/Weather'
import Wind from './components/Wind/Wind';
import Forecast from './components/Forecast/Forecast';
import TempChart from './components/TempChart/TempChart';

const API_KEY = 'e417df62e04d3b1b111abeab19cea714'
// const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${API_KEY}`
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?'

function App() {
  const [weatherData, setWeatherData] = useState({})
  const [forecastData, setForecastData] = useState({})
  const [isForecastLoad, setForecastLoad] = useState(false)
  const [isweatherLoad, setWeatherLoad] = useState(false)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude: " + position.coords.latitude);
        const lat = position.coords.latitude
        console.log("Longitude: " + position.coords.longitude);
        const lon = position.coords.longitude
        getWeather(lat, lon)
        getForecast(lat, lon)
      });
    } else {
      console.log("Geolocation is not supported.");
    }
  }, [])

  async function handleInput (city) {
    try {
      const responce = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
      console.log(responce)
      const data = responce.data
      if (data[0]) {
        console.log(`LAT: ${data[0].lat}, LON: ${data[0].lon}`);
        getWeather(data[0].lat, data[0].lon)
        getForecast(data[0].lat, data[0].lon)
      } else {
        console.log('City not found');
      }
    } catch (error) {
      console.error(`Ошибка запроса: ${error.message}`)
    }
  }

  async function getWeather(lat, lon) {
    try {
      const responce = await axios.get(`${API_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      if (responce.status === 200) {
        const data = responce.data
        setWeatherData(data)
        setWeatherLoad(true)
        console.log('Weather OK');
      } else {
        console.log(responce);
      }
    } catch (error) {
      console.error(`Request error: ${error.message}`)
    }
  }

  

  async function getForecast(lat, lon) {
    try {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      setForecastData(response.data)
      console.log('Forecast OK');
      setForecastLoad(true)
    } catch (error) {
      console.error(`Request error: ${error.message}`)
    }
  }

  return (
    <div className='main'>
      <Header onChange={handleInput} />
      <div className='content-container'>
        {isweatherLoad && <Weather data={weatherData}/>}
        {isForecastLoad && <Forecast data={forecastData}/>}
        {isweatherLoad && <Wind data={weatherData}/>}
        {isForecastLoad && <TempChart forecastData={forecastData}/>}
      </div>
    </div>
  );
}

export default App;
