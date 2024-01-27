import { useState, useEffect } from 'react';
import './CurrentWeatherCard.css';

function CurrentWeatherCard() {
    const [currentWeatherData, setCurrentWeatherData] = useState({
        condition: '',
        icon: ''
    });

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=f7af6cf12f7040ac9e404543230612&q=92841&days=3", { mode: 'cors' });
            const weatherData = await response.json();
            console.log(weatherData);

            setCurrentWeatherData(prevData => ({
                ...prevData,
                condition: weatherData.current.condition.text,
                icon: weatherData.current.condition.icon
            }));
        } catch (error) {
            console.error('Error!:', error.message);
        }
    };

    fetchData();

}, []);

return (
    <div>
        <p>{currentWeatherData.condition}</p>
        <img src={currentWeatherData.icon} alt="Weather icon" />
    </div>
    );
}

export default CurrentWeatherCard
