import React from 'react';
import {APP_ID, APP_URL} from './config/environment.js'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      name: '',
      temp: null,
      description: ''
    }
    this.getWeatherInfo = this.getWeatherInfo.bind(this)
  }
  
  componentDidMount() {
    this.getWeatherInfo()
  }

  getWeatherInfo () {
    navigator.geolocation.getCurrentPosition(async(position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude

      try {
        const res = await fetch(`${APP_URL}?lat=${lat}&lon=${lon}&units=metric&APPID=${APP_ID}`);
        const weatherData = await res.json();
        let fahrenheight = (weatherData.main.temp)*(9/5) + 32
        this.setState({name: weatherData.name,
                      temp: fahrenheight,
                      description: weatherData.weather[0].description})
        return weatherData
      } catch (err) {
        console.error(err)
      }
    })
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.name}</h1>
        <h3>{this.state.temp}&deg;F</h3>
        <h3>{this.state.description}</h3>
        <h3>View song recommendations: </h3>
        <button>playlist</button>
      </div>
    );
  }
}

export default App;
