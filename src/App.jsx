import { useState, useEffect } from 'react'
import './App.css'

import './CurrentWeatherCard.jsx'
import CurrentWeatherCard from './CurrentWeatherCard'

import './ForecastWeatherCards.jsx'
import ForecastWeatherCards from './ForecastWeatherCards.jsx'

import './WeatherDetailsDropDown.jsx'
import WeatherDetailsDropDown from './WeatherDetailsDropDown.jsx'

import './LocationInputForm.jsx'
import LocationInputForm from './LocationInputForm'

import './hooks/useFetchData.jsx'
import useFetchData from './hooks/useFetchData.jsx';

import MyResponsiveLine from './MyResponsiveLine'

function App() {
  const [ForecastDays, setDisplayForecastDays] = useState(3)
  const [locationInput, setLocationInput] = useState(92841)
  const [selectedCardData, setSelectedCardData] = useState([])
  const [chartData, setChartData] = useState([]);
  const [forecastDataArray, setForecastDataArray] = useState([])
  const [loading, setLoading] = useState(true)
  const [clickedDropdown, setClickedDropdown] = useState("hour_temp_f")
  const [cardIndex, setCardIndex] = useState(0)

  const { DataArray } = useFetchData(`http://api.weatherapi.com/v1/forecast.json?key=f7af6cf12f7040ac9e404543230612&q=92841&days=${ForecastDays}`, ForecastDays);

  const handleCardClick = (event) => {
    setCardIndex(event.currentTarget.getAttribute('index'))
    if (cardIndex) {
      console.log(`This card index is ${cardIndex}`)
    } else {
      console.error('Unable to determine card index');
    }

    if(event.currentTarget.id === "currentWeatherCard"){
      console.log("Current weather card clicked")
    } else if (event.currentTarget.id === `forecastCard${cardIndex}`){
      console.log(`Forecast Weather Card #${cardIndex} clicked!`)
      setSelectedCardData(DataArray[cardIndex][clickedDropdown])
    } else {
      console.error("Unknown card clicked")
    }
  }

  function handleDropdownClick(event){

    console.log("clicked")

    if(event.target.matches('.temperature')){
      setClickedDropdown("hour_temp_f")
      setSelectedCardData(DataArray[cardIndex][clickedDropdown])

    } else if (event.target.matches('.uv-index')) {
        setClickedDropdown("hour_uv")
        setSelectedCardData(DataArray[cardIndex][clickedDropdown])

      } else if (event.target.matches('.wind')) {
        setClickedDropdown("hour_wind_mph")
        setSelectedCardData(DataArray[cardIndex][clickedDropdown])

      } else if (event.target.matches('.precipitation')) {
        setClickedDropdown("hour_precipitation")
        setSelectedCardData(DataArray[cardIndex][clickedDropdown])

      } else if (event.target.matches('.feels-like')) {
        setClickedDropdown("hour_feelslike_f")
        setSelectedCardData(DataArray[cardIndex][clickedDropdown])

      } else if (event.target.matches('.humidity')) {
        setClickedDropdown("hour_humidity")
        setSelectedCardData(DataArray[cardIndex][clickedDropdown])

      } else if (event.target.matches('.visibility')) {
        setClickedDropdown("hour_visibility_miles")
        setSelectedCardData(DataArray[cardIndex][clickedDropdown])

      } else if (event.target.matches('.pressure')) {
        setClickedDropdown("hour_pressure_in")
        setSelectedCardData(DataArray[cardIndex][clickedDropdown])
    } 
    
    } 

  useEffect(() => {
    setForecastDataArray(DataArray)
    setLoading(false);
  }, [locationInput, ForecastDays, DataArray]);

  useEffect(() => {
    console.log(clickedDropdown)
    setChartData([
      {
        id: 'us',
        color: 'hsl(145, 70%, 50%)',
        data: selectedCardData,
      }
    ]);
  }, [selectedCardData, clickedDropdown]);

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
        <WeatherDetailsDropDown onClick={handleDropdownClick}/>
        <MyResponsiveLine data={chartData}/>
      </div>

    </div>
  )
}

export default App

/* <MyResponsiveLine data={data} /> */