import './App.css';
import React, { useState } from 'react'
import Header from './components/Header/Header';
import Weather from './components/Weather/Weather'

const API_KEY = 'e417df62e04d3b1b111abeab19cea714'
// const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${API_KEY}`
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?'

function App() {
  const [weatherData, setWeatherData] = useState({})
  const [complited, setComplited] = useState(false)

  function handleInput (city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
      .then((responce) => {
        return responce.json()
      })
      .then ((data) => {
        console.log(data)
        if (data[0]) {
          console.log(`LAT: ${data[0].lat}, LON: ${data[0].lon}`);
          findWeather(data[0].lat, data[0].lon)
        } else {
          console.log('City not found');
        }
      })
  }

  function findWeather(lat, lon) {
    fetch (`${API_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then ((responce) => {
        return responce.json()
      })
      .then ((data) => {
        if (data.cod === 200) {
          setWeatherData(data)
          setComplited(true)
          console.log('OK', weatherData);
        } else {
          console.log(data);
        }
      })
  }

  return (
    <div className='main'>
      <Header onChange={handleInput} />
      {complited && <Weather data={weatherData}/>}
    </div>
  );
}

export default App;
