import { useState, useEffect } from 'react';

const useFetchCurrentData = (url) => {

    const [currentWeatherData, setCurrentWeatherData] = useState({
        condition: '',
        icon: '',
        temp_f: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, { mode: 'cors' });
                const weatherData = await response.json();
                console.log(weatherData);
    
                setCurrentWeatherData(prevData => ({
                    ...prevData,
                    condition: weatherData.current.condition.text,
                    icon: weatherData.current.condition.icon,
                    temp_f: Math.round(weatherData.current.temp_f)
                }));
            } catch (error) {
                console.error('Error!:', error.message);
            }
        };
    
        fetchData();
    
    }, []);

    return {currentWeatherData}
}

export default useFetchCurrentData