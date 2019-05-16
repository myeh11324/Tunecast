import React from 'react';
import {APP_ID, APP_URL} from './config/environment.js'
import './App.css';

class App extends React.Component {
  constructor() {
    super() 
    this.state = {
      name: '',
      temp: null,
      description: ''
    }
  }
  
  componentDidMount() {
  }

  getWeatherInfo = async () => {
    navigator.geolocation.getCurrentPosition(async function(position) {
      let lat = position.coords.latitude
      let lon = position.coords.longitude

      try {
        const res = await fetch(`${APP_URL}?lat=${lat}&lon=${lon}&units=metric&APPID=${APP_ID}`);
        const weatherData = await res.json();
        console.log(weatherData.name, weatherData.main.temp, weatherData.weather[0].description)
        //conversion (7.1°C × 9/5) + 32 = 44.78°F
        return weatherData;
      } catch (err) {
        console.error(err)
      }
    })
  }

  render() {
    this.getWeatherInfo()
    return (
      <div className="App">
        <header className="App-header">
        Welcome, the weather in your area is: 
        </header>
        <h3>View song recommendations: </h3>
      </div>
    );
  }
}

export default App;
