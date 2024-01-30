import { useState, useEffect } from 'react';

function ForecastWeatherCard(props) {

    const [ForecastWeatherData, setForecastWeatherData] = useState({
        condition: '',
        icon: '',
        temp_f: ''
    });

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=f7af6cf12f7040ac9e404543230612&q=92841&days=3", { mode: 'cors' });
            const weatherData = await response.json();
            console.log(weatherData);

            setForecastWeatherData(prevData => ({
                ...prevData,
                condition: weatherData.forecast.forecastday[props.day].day.condition.text,
                icon: weatherData.forecast.forecastday[props.day].day.condition.icon,
                temp_f: Math.round(weatherData.forecast.forecastday[props.day].day.avgtemp_f)
            }));
        } catch (error) {
            console.error('Error!:', error.message);
        }
    };

    fetchData();

}, []);

return (
    <div className="card">
        <img src={ForecastWeatherData.icon} alt="Weather icon" className="card_icon"/>
        <p className="card_temp">{ForecastWeatherData.temp_f}°</p>
        <p className="card_condition">{ForecastWeatherData.condition}</p>
    </div>
    );
}

export default ForecastWeatherCard
