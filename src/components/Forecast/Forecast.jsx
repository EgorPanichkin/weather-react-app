import React from 'react'
import ForecastItem from './Forecast-item';
import style from './forecast.module.css'

export default function Forecast({ data }) {
  return (
    <div className={style.container}>
      {data.list.map((item) => {
        if ((item.dt_txt.slice(11, 13)) === '12') {
          return <ForecastItem data={item} key={item.dt}/>
        } else {
          return null
        }
      })}
    </div>
  )
}
