import React from 'react'
import style from './forecast.module.css'

export default function ForecastItem({ data }) {
  return (
    <div className={style.item}>
      <p>Date: {data.dt_txt.slice(5, 10)}</p>
      <p>Temp: {Math.round(data.main.temp - 273.15)} &deg;C</p>
      <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt='weather' />
    </div>
  )
}
