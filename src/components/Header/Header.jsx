import React, { useEffect, useState } from 'react'
import style from './Header.module.css'

export default function Header(props) {

  const [time, setTime] = useState(new Date())
  const [value, setValue] = useState('')

  setInterval(() => {setTime(new Date())}, 1000)
  
  function makeTwoDigits(number) {
    return String(number).padStart(2, '0');
  }

  function handleChange(value) {
    setValue(value)
    // props.onChange(value)
  }

  useEffect(() => {
    const onKeypress = (e) => {
      if (e.code === 'Enter') {
        props.onChange(value)
      }
    };
  
    document.addEventListener('keypress', onKeypress);
  
    return () => {
      document.removeEventListener('keypress', onKeypress);
    };
  })

  return (
    <div className={style.container}>
      <div className={style.clock}>
        <p>{makeTwoDigits(time.getHours())}:{makeTwoDigits(time.getMinutes())}:{makeTwoDigits(time.getSeconds())}</p>
        <p>{time.getDate()}.{time.getMonth()}.{time.getFullYear()}</p>
      </div>
      <input 
        value={value}
        className={style.search}
        type="text"
        placeholder='Введите название города'
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  )
}