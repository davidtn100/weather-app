import { useState, useEffect } from 'react'
import './App.css'
import CurrentWeatherCard from './CurrentWeatherCard.jsx'
import ForecastWeatherCards from './ForecastWeatherCards.jsx'
import WeatherDetailsDropDown from './WeatherDetailsDropDown.jsx'
import LocationInputForm from './LocationInputForm.jsx'
import useFetchData from './hooks/useFetchData.jsx'
import MyResponsiveLine from './MyResponsiveLine'

function App() {
  const [ForecastDays, setDisplayForecastDays] = useState(3)
  const [locationInput, setLocationInput] = useState(92841)
  const [selectedCardData, setSelectedCardData] = useState([])
  const [chartData, setChartData] = useState([]);
  const [forecastDataArray, setForecastDataArray] = useState([])
  const [loading, setLoading] = useState(true)
  const [clickedDropdown, setClickedDropdown] = useState("hour_temp_f")
  const [cardIndex, setCardIndex] = useState(null)
  const [axisLeftLegend, setAxisLeftLegend] = useState("Temperature")

  const { DataArray } = useFetchData(`http://api.weatherapi.com/v1/forecast.json?key=f7af6cf12f7040ac9e404543230612&q=92841&days=${ForecastDays}`, ForecastDays);

  useEffect(() => {
    if (cardIndex !== null && clickedDropdown !== null) {
      setSelectedCardData(DataArray[cardIndex][clickedDropdown]);
    }
  }, [cardIndex, clickedDropdown]);

  const handleCardClick = (event) => {
    const newIndex = event.currentTarget.getAttribute('index');
    if (newIndex) {
      console.log(`This card index is ${newIndex}`);
      setCardIndex(newIndex);
    } else {
      console.error('Unable to determine card index');
    }
  }

  useEffect(() => {
    if (cardIndex !== null && clickedDropdown !== null) {
        setSelectedCardData(DataArray[cardIndex][clickedDropdown]);
        setChartData([
          {
            id: 'us',
            color: 'hsl(145, 70%, 50%)',
            data: selectedCardData,
          }
        ]);
      } 
  }, [cardIndex, clickedDropdown]);

  useEffect(() => {
        setChartData([
          {
            id: 'us',
            color: 'hsl(145, 70%, 50%)',
            data: selectedCardData,
          }
        ]);
  }, [selectedCardData]);

  function handleDropdownClick(event){

    if(event.target.matches('.temperature')){
      setClickedDropdown("hour_temp_f")
      setAxisLeftLegend("Temperature")

    } else if (event.target.matches('.uv-index')) {
        setClickedDropdown("hour_uv")
        setAxisLeftLegend("UV Index")

      } else if (event.target.matches('.wind')) {
        setClickedDropdown("hour_wind_mph")
        setAxisLeftLegend("Wind (mph)")

      } else if (event.target.matches('.precipitation')) {
        setClickedDropdown("hour_precipitation")
        setAxisLeftLegend("Precipitation (in)")

      } else if (event.target.matches('.feels-like')) {
        setClickedDropdown("hour_feelslike_f")
        setAxisLeftLegend("Temperature")

      } else if (event.target.matches('.humidity')) {
        setClickedDropdown("hour_humidity")
        setAxisLeftLegend("Humidity")

      } else if (event.target.matches('.visibility')) {
        setClickedDropdown("hour_visibility_miles")
        setAxisLeftLegend("Visibility")

      } else if (event.target.matches('.pressure')) {
        setClickedDropdown("hour_pressure_in")
        setAxisLeftLegend("Pressure (in)")
    } 
    
  } 

  useEffect(() => {
    setForecastDataArray(DataArray)
    setLoading(false);
  }, [locationInput, ForecastDays, DataArray]);

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
        <MyResponsiveLine data={chartData} axisLeftLegend={axisLeftLegend}/>
      </div>

    </div>
  )
}

export default App

/* <MyResponsiveLine data={data} /> */