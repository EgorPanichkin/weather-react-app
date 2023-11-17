import React from 'react'

export default function Weather({ data }) {
  console.log(data);
  return (
    <div>
      <h3>{data.name}</h3>
      <p>country: {data.sys.country}</p>
      <p>temp: {data.main.temp}</p>
    </div>
  )
}
