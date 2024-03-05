import { useState, useEffect } from 'react';
import './hooks/useFetchCurrentData.jsx'
import useFetchCurrentData from './hooks/useFetchCurrentData';

function CurrentWeatherCard(props) {

const {currentWeatherData} = useFetchCurrentData(`http://api.weatherapi.com/v1/forecast.json?key=f7af6cf12f7040ac9e404543230612&q=${props.location}&days=3`)

return (
    <div 
    className="card" 
    id = "currentWeatherCard"
    onClick = {props.onClick}
    >
        <img src={currentWeatherData.icon} alt="Weather icon" className="card_icon"/>
        <p>Right Now</p>
        <p className="card_temp">{currentWeatherData.temp_f}°</p>
        <p className="card_condition">{currentWeatherData.condition}</p>
    </div>
    );
}

export default CurrentWeatherCard
