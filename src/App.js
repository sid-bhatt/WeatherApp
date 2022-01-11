import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const API_KEY = '6255c04eeac9114b5d1de0ea00699117';
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState('');
  const [idButtonClicked, setidButtonClicked] = useState('')
  const [flag, setFlag] = useState(false)

  const clearFunc = () => {
    setCity('')
    setWeatherData([])
  }
  const handleClick = () => {
    setidButtonClicked(city)
    setFlag(true)
  }
  
  // let emoji = null;
  const getEmoji = () => {
    if(typeof weatherData.main !== 'undefined'){
      if(weatherData.weather[0].main === 'Clouds'){
        return 'fa fa-cloud fa-4x'
      }
      else if(weatherData.weather[0].main === 'Thunderstorm'){
        return 'fa fa-bolt fa-4x'
      }
      else if(weatherData.weather[0].main === 'Drizzle'){
        return 'fa fa-cloud-rain fa-4x'
      }
      else if(weatherData.weather[0].main === 'Rain'){
        return 'fa fa-clou-shower-heavy fa-4x'
      }
      else if(weatherData.weather[0].main === 'Snow'){
        return 'fa fa-snow-flake fa-4x'
      }
      else if(weatherData.weather[0].main === 'Sunny' || weatherData.weather[0].main === 'Clear'){
        return 'fa fa-sun fa-4x'
      }
      else{
        return 'fa fa-smog fa-4x'
      }
    }
  }
  

  useEffect(() => {
    const getWeather = () => axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${idButtonClicked}&appid=${API_KEY}`)
      .then(res => {
        // setCity('')
        setWeatherData(res.data)
        console.log('button clicked =>', res.data);
      })
      .catch(err => {
        alert('City not found!!')
        console.log(err);
      })
      if(flag === true){
        getWeather()
        getEmoji()
      }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag, idButtonClicked])

  // let minTemperature = Math.round(weatherData.main.temp_min - 273.15);

  return (
    <div className="container">
      <div className="header">
        <input className="input" type="text" value={city} onChange={e => setCity(e.target.value)} onFocus={clearFunc}/>
        <button className='btn btn-primary' onClick={handleClick}>Click Me</button>
      </div>

      {typeof weatherData.main !== 'undefined' ? (
        <div className='weather-data'>
          <p className='city'>{weatherData.name}, {weatherData.sys.country}</p>
          <p className='temp'>
            {Math.round(weatherData.main.temp-273.15)}&deg;C
          </p>
          <p className={getEmoji()}></p>
          <p className='weather'>{weatherData.weather[0].main}</p>
          <p className='weather'>{Math.round(weatherData.main.temp_min - 273.15)}&deg;C | {Math.round(weatherData.main.temp_max - 273.15)}&deg;C</p>
        </div>
        ): (
        <div>
          <p>Welcome to weather app! Enter a city name!!</p>
        </div>
      )}

        
    </div>
  );
}

export default App;
