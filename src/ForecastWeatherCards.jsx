import { useState, useEffect } from 'react';

const SingleForecastCard = ({ forecastData, onClick, index }) => {
    return (
        <div 
        className="card"
        index = {index}
        id = {`forecastCard${index}`}
        onClick = {onClick}  
        >
            <img src={forecastData.icon} alt="Weather icon" className="card_icon" />
            <p>{forecastData.dayName}</p>
            <p className="card_temp">{forecastData.temp_f}°</p>
            <p className="card_condition">{forecastData.condition}</p>
        </div>
    );
};

const ForecastWeatherCards = ({forecastDataArray, onClick}) => {

    if (!forecastDataArray) {
        return null; 
    }

    return (
        <>
            {forecastDataArray.map((dayData, index) => (
                <SingleForecastCard 
                forecastData={dayData} 
                onClick = {onClick}
                index = {index}
                key = {index}
                />
            ))}
        </>
    );
};

export default ForecastWeatherCards;