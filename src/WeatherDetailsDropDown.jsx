import { useState, useEffect } from 'react';

function WeatherDetailsDropDown({onClick}){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    function toggleDropdown(){
        setIsDropdownOpen(!isDropdownOpen);
    }

    function closeDropdown(event){
        if (!event.target.matches('.dropbtn')){
            const dropdowns = document.getElementsByClassName('dropdown-content')
            for (let i=0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i]
                if (openDropdown.classList.contains('show')){
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    window.onclick = closeDropdown

    return (
    <div>
        <div className="dropdown">
        <button onClick={toggleDropdown} className="dropbtn">
            Choose
        </button>
        <div
            id="myDropdown"
            className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}
            onClick={onClick}
        >
            <p className="temperature">Temperature</p>
            <p className="uv-index">UV Index</p>
            <p className="wind">Wind</p>
            <p className="precipitation">Precipitation</p>
            <p className="feels-like">Feels Like</p>
            <p className="humidity">Humidity</p>
            <p className="visibility">Visibility</p>
            <p className="pressure">Pressure</p>
        </div>
        </div>
    </div>
    );

}

export default WeatherDetailsDropDown
