import React from 'react';
import {APP_ID, APP_URL} from './config/environment.js'
import axios from 'axios'
// import playlistSongs from './server/GetData.js'
// import {playlistSongs} from './Spotify'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      name: '',
      temp: null,
      description: '',
      songs: []
    }
    this.getWeatherInfo = this.getWeatherInfo.bind(this)
  }
  
  async componentDidMount() {
    this.getWeatherInfo()
    const result = await axios.get('/api/songs/sad')
    const tracks = result.data.slice(0,10)
    this.setState({songs: tracks})
    console.log(this.state)
  }

  handleClick() {
    //on click (the view songs button), i want to grab the songs from my backend routes
    //which will depend on the weather conditions. for now, either happy or sad 
  }

  getWeatherInfo () {
    navigator.geolocation.getCurrentPosition(async(position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude

      try {
        const res = await fetch(`${APP_URL}?lat=${lat}&lon=${lon}&units=metric&APPID=${APP_ID}`);
        const weatherData = await res.json();
        let fahrenheight = Math.round((weatherData.main.temp)*(9/5) + 32)
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
    // test()
    // playlistSongs()
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
