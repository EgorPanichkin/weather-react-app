import React from 'react'
import style from './weather.module.css'

export default function Weather({ data }) {
  return (
    <div className={style.container}>
      <h3 className={style.header}>{data.name}</h3>
      <div className={style.content}>
        <div className={style.leftItem}>
          <p>Country: {data.sys.country}</p>
          <p>Temp: {Math.round(data.main.temp - 273.15)} &deg;C</p>
          <p>Humidity: {data.main.humidity}%</p>
        </div>
        <div className={style.rightItem}>
          <img className={style.icon} src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt='weather' />
        </div>
      </div>
    </div>
  )
}
