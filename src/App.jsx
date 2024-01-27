import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './CurrentWeatherCard.jsx'
import CurrentWeatherCard from './CurrentWeatherCard'

function App() {
  const [count, setCount] = useState(0)

  return (
  <CurrentWeatherCard />
  )
}

export default App
