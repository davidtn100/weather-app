import { useState } from 'react'
import './App.css'
import './CurrentWeatherCard.jsx'
import CurrentWeatherCard from './CurrentWeatherCard'
import './ForecastWeatherCard.jsx'
import ForecastWeatherCard from './ForecastWeatherCard'

function App() {
  const [ForecastDay, setDisplayForecastDays] = useState(3)
  const [locationInput, setLocationInput] = useState(92841)

  function populateForecastWeatherCards(){
    const totalForecastDays = ForecastDay
    const forecastCards = []
    for (let i = 0; i < totalForecastDays; i++) {
      forecastCards.push(
      <ForecastWeatherCard
        day={i}
        key={i}
      />
      );
    }
    return forecastCards
  }
  return (
    <div className="app">
    <CurrentWeatherCard location={locationInput}/>
    {populateForecastWeatherCards()}
    </div>
  )
}

export default App
