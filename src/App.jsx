import { useState } from 'react'
import './App.css'
import './CurrentWeatherCard.jsx'
import CurrentWeatherCard from './CurrentWeatherCard'
import './ForecastWeatherCards.jsx'
import ForecastWeatherCards from './ForecastWeatherCards.jsx'
import './LocationInputForm.jsx'
import LocationInputForm from './LocationInputForm'

import MyResponsiveLine from './MyResponsiveLine'

function App() {
  const [ForecastDays, setDisplayForecastDays] = useState(3)
  const [locationInput, setLocationInput] = useState(92841)

  const data = [
    {
    "id": "us",
    "color": "hsl(145, 70%, 50%)",
    "data": [
      { "x": "plane", "y": 162},
      {"x": "helicopter","y": 250},
      {"x": "boat","y": 253},
      {"x": "train","y": 44},
      {"x": "subway","y": 163},
      {"x": "bus","y": 71},
      {"x": "car","y": 101},
      {"x": "moto","y": 290},
      {"x": "bicycle","y": 47},
      {"x": "horse","y": 125},
      {"x": "skateboard","y": 131},
      {"x": "others","y": 8}
      ]
    }
  ];

  return (
    <div>

      <div className="weatherCards">
      <LocationInputForm/>
      <CurrentWeatherCard location={locationInput}/>
      <ForecastWeatherCards totalDays={ForecastDays}/>
      </div>

      <div className="chart">
      <h1>Super Cool Nivo Bar Chart</h1>
      </div>

    </div>
  )
}

export default App

//     <MyResponsiveLine data={data} />