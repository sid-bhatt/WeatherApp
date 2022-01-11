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
  // const getWeather = (e) => {
  //   if(e.key === 'enter'){
  //     axios
  //     .get(`api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
  //     .then(res => {
  //       console.log('button clicked =>', res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  //   }
  // }

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
      }
    
  }, [flag, idButtonClicked])

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
            {Math.round(weatherData.main.temp-273.15)}<span>&#176;C</span>
          </p>
          <p className='weather'>{weatherData.weather[0].main}</p>
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
