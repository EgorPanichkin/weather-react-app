import React, { useEffect, useState } from 'react'
import weatherCounter from './counter'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function WeatherCountChart({ forecastData }) {
  const [countedArrayWeather, setCountArrayWeather] = useState([])

  useEffect(() => 
    {
      const array = weatherCounter(forecastData)
      setCountArrayWeather(array)
    }, [forecastData])

  const styleObj = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '270px',
    height: '330px',
    backgroundColor: '#1B1B1D',
    borderRadius: '15px',
    boxShadow: '5px 5px 12px #055f9f92'
  }

  const options = {
    plugins: {
      legend: {
        display: true,
        color: 'white',
        position: 'bottom',
      },
      title: {
        display: true,
        position: 'top',
        text: 'Weather',
        color: 'White',
        size: 16
      },
    }
  }

  const data = {
    labels: countedArrayWeather.map((item) => item.weather),
    datasets: [
      {
        label: 'Count (%)',
        data: countedArrayWeather.map((item) => ((item.count)/40)*100),
        backgroundColor: [
          '#0d33a3',
          '#8d21cc',
          '#36c98a',
          '#7313c2',
          '#c2bf13',
        ],
        borderColor: [
          'rgba(255, 255, 232, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }

  console.log(countedArrayWeather);
  return (
    <div style={styleObj}>
      <Doughnut data={data} options={options}/>
    </div>
    
  )
}
