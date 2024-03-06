import { useState, useEffect } from 'react';

const useFetchData = (url, totalDays) => {

    const [DataArray, setDataArray] = useState([{}]);
    
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
        async function fetchData() {
            try {
                const response = await fetch(url, { mode: 'cors' });
                const weatherData = await response.json();
                console.log(weatherData)
                const newForecastDataArray = [];

                for (let i = 0; i < totalDays; i++) {
                    const forecastDate = convertDateFormat(weatherData.forecast.forecastday[i].date);
                    
                    function abbrvHourTime(datePlusHour){
                        const array = datePlusHour.split(" ")
                        const hour = array[1]
                        return hour
                    }
                    
                    const hourly_temp_f_Data = weatherData.forecast.forecastday[i].hour.map(hourData => {
                        return { "x": abbrvHourTime(hourData.time), "y": hourData.temp_f };
                    });

                    const hourly_temp_c_Data = weatherData.forecast.forecastday[i].hour.map(hourData => {
                        return { "x": abbrvHourTime(hourData.time), "y": hourData.temp_c };
                    });

                    const hourly_uv = weatherData.forecast.forecastday[i].hour.map(hourData => {
                        return { "x": abbrvHourTime(hourData.time), "y": hourData.uv};
                    });

                    const hourly_wind_mph = weatherData.forecast.forecastday[i].hour.map(hourData => {
                        return { "x": abbrvHourTime(hourData.time), "y": hourData.wind_mph};
                    });

                    const hourly_precipitation = weatherData.forecast.forecastday[i].hour.map(hourData => {
                        return { "x": abbrvHourTime(hourData.time), "y": hourData.precip_in};
                    });

                    const hourly_feelslike_f = weatherData.forecast.forecastday[i].hour.map(hourData => {
                        return { "x": abbrvHourTime(hourData.time), "y": hourData.feelslike_f};
                    });

                    const hourly_feelslike_c = weatherData.forecast.forecastday[i].hour.map(hourData => {
                        return { "x": abbrvHourTime(hourData.time), "y": hourData.feelslike_c};
                    });

                    const hourly_humidity = weatherData.forecast.forecastday[i].hour.map(hourData => {
                        return { "x": abbrvHourTime(hourData.time), "y": hourData.humidity};
                    });

                    const hourly_visibility_miles = weatherData.forecast.forecastday[i].hour.map(hourData => {
                        return { "x": abbrvHourTime(hourData.time), "y": hourData.vis_miles};
                    });

                    const hourly_pressure_in = weatherData.forecast.forecastday[i].hour.map(hourData => {
                        return { "x": abbrvHourTime(hourData.time), "y": hourData.pressure_in};
                    });


                    newForecastDataArray.push({
                        condition: weatherData.forecast.forecastday[i].day.condition.text,
                        icon: weatherData.forecast.forecastday[i].day.condition.icon,
                        temp_f: Math.round(weatherData.forecast.forecastday[i].day.avgtemp_f),
                        dayName: dayNameFromDate(new Date(forecastDate)),
                        hour_temp_f: hourly_temp_f_Data,
                        hour_temp_c: hourly_temp_c_Data,
                        hour_uv: hourly_uv,
                        hour_wind_mph: hourly_wind_mph,
                        hour_precipitation: hourly_precipitation,
                        hour_feelslike_f: hourly_feelslike_f,
                        hour_feelslike_c: hourly_feelslike_c,
                        hour_humidity: hourly_humidity,
                        hour_visibility_miles: hourly_visibility_miles,
                        hour_pressure_in: hourly_pressure_in
                    })
                }

                setDataArray(newForecastDataArray);
                console.log(newForecastDataArray)
                
            } catch (error) {
                console.error('Error!:', error.message);
            }
        };

        fetchData();

    }, []);

    return {DataArray};
}

export default useFetchData;
