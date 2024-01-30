import { useState } from 'react'
import './App.css'
import './CurrentWeatherCard.jsx'
import CurrentWeatherCard from './CurrentWeatherCard'
import './ForecastWeatherCard.jsx'
import ForecastWeatherCard from './ForecastWeatherCard'

function App() {
  const [ForecastDay, setDisplayForecastDays] = useState(3)

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
    <div>
    <CurrentWeatherCard />
    {populateForecastWeatherCards()}
    </div>
  )
}

export default App
