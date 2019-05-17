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
    // this.getWeatherInfo = this.getWeatherInfo.bind(this)
  }
  
  componentDidMount() {
    this.getWeatherInfo()
  }

  getWeatherInfo () {
    // console.log('state',this.state)
    navigator.geolocation.getCurrentPosition(async(position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude

      try {
        const res = await fetch(`${APP_URL}?lat=${lat}&lon=${lon}&units=metric&APPID=${APP_ID}`);
        const weatherData = await res.json();
        let fahrenheight = (weatherData.main.temp)*(9/5) + 32
        // console.log('state:',this.state)
        this.setState({name: weatherData.name,
                      temp: fahrenheight,
                      description: weatherData.weather[0].description})
        console.log('state after', this.state)
        return weatherData
      } catch (err) {
        console.error(err)
      }
    })
  }

  render() {
    // this.getWeatherInfo()
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
