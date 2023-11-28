import React from 'react'
import style from './wind.module.css'
import arrow from './Arrow.svg'

export default function Wind({ data }) {
  return (
    <div className={style.container}>
      <div className={style.compass}>
        <img src={arrow} alt="Arrow" style={{rotate: `${(data.wind.deg)+180}deg`}} className={style.arrow} />
        <div>{data.wind.deg}&deg;</div>
      </div>
      <div className={style.text}>
        <div>Max speed: {(data.wind.gust) ? (data.wind.gust) : (data.wind.speed)} m/s</div>
        <div>Speed: {data.wind.speed} m/s</div>
      </div>
    </div>
  )
}
