import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
// import { Chart as ChartJS } from 'chart.js/auto'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js'
import style from './tempChart.module.css'

ChartJS.register(  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const styleObj = {
  display: 'flex',
  justifyContent: 'center',
  width: '700px',
  height: '330px',
  backgroundColor: '#1B1B1D',
  padding: '25px',
  borderRadius: '15px',
  boxShadow: '5px 5px 12px #055f9f92'
}

export default function TempChart({ forecastData }) {
  const [labelsArray, setlabelsArray] = useState([])

  useEffect(() => {
    setlabelsArray(
      forecastData.list.map((item, index) => {
        if (((index + 1) % 3) === 0) {
          return item.dt_txt.slice(5, 10)
        } else {
          return ''
        }
      })
    )
  }, [forecastData])


  const options = {
    plugins: {
      customCanvasBackgroundColor: {
        color: 'lightGreen',
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
        position: 'top',
        text: 'Air Temperature',
        color: 'White',
        size: 16
      },
    },
    elements: {
      line: {
        tension: 0.5,
      },
      labels: {
        display: true,
        color: 'red'
      },
      ticks: {
        display: false,
      }
    },
  }

  const data = {
    labels: labelsArray,
    datasets: [
      {
        fill: true,
        label: 'Temperature',
        data: forecastData.list.map((item) => ((item.main.temp) - 273.15)),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        hoverBorderColor: 'red'
      }
    ]
  }

  return (
    <div style={styleObj} className={style.chartBox}>
      <Line data={data} options={options}/>
    </div>
  )
}
