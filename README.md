# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Project Scope
    - Want to make home screen show 3-day forecast (free)
    - Goal is to make each of the 3 days simple and cute UI. 
        Purpose is for aesthetics and quick information.
        Possibly best used for home screens on apps and web browsers.
    - UI
        3 panels, for 3 days. Set toggle for multiple locations to be displayed
        PANEL 1
            Weather Condition Symbol
                Day 1, show current weather
            Average Temperature? Maybe customizable to display hottest/coldest, F or C
            Weather condition label
            !!! warn user if weird weather is coming later that day, ! another notification for small change
        
        PANEL 2
            Detailed weather condition schedule
                show times throughout day, temperature, weather symbol
            

        Panel 3, etc
            Precipitation, wind schedule warnings

    Data we want to extract:
