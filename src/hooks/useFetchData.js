import { useState, useEffect } from 'react';

const useFetchData = (url,props) => {
    const [forecastWeatherData, setForecastWeatherData] = useState({
        condition: '',
        icon: '',
        temp_f: '',
        dayName: '',
        hour_temp_f: []
    });
    
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

    function dayNameFromDate(date){
        const dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const dayIndex = date.getDay();
        return dayName[dayIndex];
    }
    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(url, { mode: 'cors' });
                const weatherData = await response.json();
                
                console.log(weatherData);

                const forecastDate = convertDateFormat(weatherData.forecast.forecastday[props.day].date);
                
                const hourly_temp_f_Data = weatherData.forecast.forecastday[props.day].hour.map(hourData => {
                    return { "x": hourData.time, "y": hourData.temp_f };
                    })
                ;

                setForecastWeatherData(prevData => ({
                    ...prevData,
                    condition: weatherData.forecast.forecastday[props.day].day.condition.text,
                    icon: weatherData.forecast.forecastday[props.day].day.condition.icon,
                    temp_f: Math.round(weatherData.forecast.forecastday[props.day].day.avgtemp_f),
                    dayName: dayNameFromDate(new Date(forecastDate)),
                    hour_temp_f: hourly_temp_f_Data
                }));

            } catch (error) {
                console.error('Error!:', error.message);
            }
        };

        fetchData();

    }, [props.day, url]);

    return {forecastWeatherData};
}

export default useFetchData;

