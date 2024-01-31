import { useState, useEffect } from 'react';

function ForecastWeatherCard(props) {

    function convertDateFormat(inputDate) {
        // Parse the input date string in "YYYY-MM-DD" format
        const dateParts = inputDate.split("-");
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];

        // Create a new Date object
        const dateObject = new Date(year, month - 1, day);

        // Extract components in "MM/DD/YYYY" format
        const newMonth = (dateObject.getMonth() + 1).toString().padStart(2, "0");
        const newDay = dateObject.getDate().toString().padStart(2, "0");
        const newYear = dateObject.getFullYear();

        // Form the final date string in "MM/DD/YYYY" format
        const outputDate = `${newMonth}/${newDay}/${newYear}`;

        return outputDate;
    }

    const [forecastWeatherData, setForecastWeatherData] = useState({
        condition: '',
        icon: '',
        temp_f: '',
        dayName: ''
    });

    function dayNameFromDate(date){
        const dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const dayIndex = date.getDay();
        return dayName[dayIndex];
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=f7af6cf12f7040ac9e404543230612&q=92841&days=3", { mode: 'cors' });
                const weatherData = await response.json();
                const forecastDate = await convertDateFormat(weatherData.forecast.forecastday[props.day].date);
                console.log(weatherData);

                setForecastWeatherData(prevData => ({
                    ...prevData,
                    condition: weatherData.forecast.forecastday[props.day].day.condition.text,
                    icon: weatherData.forecast.forecastday[props.day].day.condition.icon,
                    temp_f: Math.round(weatherData.forecast.forecastday[props.day].day.avgtemp_f),
                    dayName: dayNameFromDate(new Date(forecastDate))
                }));
                console.log(new Date(weatherData.forecast.forecastday[props.day].date))

            } catch (error) {
                console.error('Error!:', error.message);
            }
        };

        fetchData();

    }, []);

    return (
        <div className="card">
            <img src={forecastWeatherData.icon} alt="Weather icon" className="card_icon"/>
            <p>{forecastWeatherData.dayName}</p>
            <p className="card_temp">{forecastWeatherData.temp_f}°</p>
            <p className="card_condition">{forecastWeatherData.condition}</p>
        </div>
        );
}

export default ForecastWeatherCard
