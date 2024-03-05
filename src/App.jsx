import { useState, useEffect } from 'react'
import './App.css'

import './CurrentWeatherCard.jsx'
import CurrentWeatherCard from './CurrentWeatherCard'

import './ForecastWeatherCards.jsx'
import ForecastWeatherCards from './ForecastWeatherCards.jsx'

import './LocationInputForm.jsx'
import LocationInputForm from './LocationInputForm'

import './hooks/useFetchData.jsx'
import useFetchData from './hooks/useFetchData.jsx';

import MyResponsiveLine from './MyResponsiveLine'

function App() {
  const [ForecastDays, setDisplayForecastDays] = useState(3)
  const [locationInput, setLocationInput] = useState(92841)
  const [selectedCardData, setSelectedCardData] = useState([])
  const [forecastDataArray, setForecastDataArray] = useState([]);
  const [loading, setLoading] = useState(true);

  const { DataArray } = useFetchData(`http://api.weatherapi.com/v1/forecast.json?key=f7af6cf12f7040ac9e404543230612&q=92841&days=${ForecastDays}`, ForecastDays);

  useEffect(() => {
    setForecastDataArray(DataArray)
    setLoading(false);
  }, [locationInput, ForecastDays, DataArray]);


  const data = [
    {
    "id": "us",
    "color": "hsl(145, 70%, 50%)",
    "data": selectedCardData
    }
  ];

  const handleCardClick = (event) => {
    const cardIndex = event.currentTarget.getAttribute('index');
    if (cardIndex) {
      console.log(`This card index is ${cardIndex}`)
    } else {
      console.error('Unable to determine card index');
    }

    if(event.currentTarget.id === "currentWeatherCard"){
      console.log("Current weather card clicked")
    } else if (event.currentTarget.id === `forecastCard${cardIndex}`){
      console.log(`Forecast Weather Card #${cardIndex} clicked!`)
      setSelectedCardData(DataArray[cardIndex].hour_temp_f)
    } else {
      console.error("Unknown card clicked")
    }
  }

  return (
    <div>
      {loading ? ( // Render loading indicator while data is being fetched
        <div>Loading...</div>
      ) : (
        <div className="weatherCards">
          <LocationInputForm/>

          <CurrentWeatherCard 
            location={locationInput} 
            onClick={handleCardClick}
          />

          <ForecastWeatherCards 
            forecastDataArray={forecastDataArray} 
            onClick={handleCardClick}
          />
        </div>
      )}

      <div className="chart">
        <h1>Super Cool Nivo Bar Chart</h1>
        <MyResponsiveLine data={data} />
      </div>
    </div>
  )
}

export default App

/* <MyResponsiveLine data={data} /> */