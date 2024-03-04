import { useState, useEffect } from 'react';

import './hooks/useFetchData.jsx'
import useFetchData from './hooks/useFetchData.jsx';

const WeatherForecastCard = ({ forecastData }) => {
    return (
        <div className="card">
            <img src={forecastData.icon} alt="Weather icon" className="card_icon" />
            <p>{forecastData.dayName}</p>
            <p className="card_temp">{forecastData.temp_f}°</p>
            <p className="card_condition">{forecastData.condition}</p>
        </div>
    );
};

const ForecastWeatherCards = (props) => {
    const {forecastDataArray} = useFetchData(`http://api.weatherapi.com/v1/forecast.json?key=f7af6cf12f7040ac9e404543230612&q=92841&days=${props.totalDays}`, props.totalDays);

    if (!forecastDataArray) {
        return null; // Return null if forecastDataArray is not available
    }

    return (
        <>
            {forecastDataArray.map((dayData, index) => (
                <WeatherForecastCard key={index} forecastData={dayData} />
            ))}
        </>
    );
};

export default ForecastWeatherCards;

/*

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

    if (!forecastDataArray) {
        return <div>Loading...</div>;
    }

    if (forecastDataArray) {
        return (
            <div className="card">
                <img src={forecastDataArray[props.day].icon} alt="Weather icon" className="card_icon"/>
                <p>{forecastDataArray[props.day].dayName}</p>
                <p className="card_temp">{forecastDataArray[props.day].temp_f}°</p>
                <p className="card_condition">{forecastDataArray[props.day].condition}</p>
            </div>
            );
    }


}
*/