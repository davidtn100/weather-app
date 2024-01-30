import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './CurrentWeatherCard.jsx'
import CurrentWeatherCard from './CurrentWeatherCard'
import './ForecastWeatherCard.jsx'
import ForecastWeatherCard from './ForecastWeatherCard'

function App() {
  const [ForecastDay, setDisplayForecastDays] = useState(1)
  return (
    <div>
  <CurrentWeatherCard />
  <ForecastWeatherCard 
    day={ForecastDay}
  />
    </div>
  )
}

export default App
