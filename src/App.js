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
    this.handleClick = this.handleClick.bind(this)
  }
  
  async componentDidMount() {
    let weatherInfo = this.getWeatherInfo()
    console.log(weatherInfo)
    // console.log(tracks)
    // console.log('TEST IMG URL', tracks[0].track.album.images[0].url) //this works
  }

  async handleClick() {
    //I think I should set state in here instead of componentDidMount
    //Try this, if doesn't work then need to move it back up
    if (this.state.temp <= 50) {
      const sadResult = await axios.get('/api/songs/sad')
      const sadTracks = sadResult.data.slice(0,10)
      this.setState({songs: sadTracks})
    } else {
      const happyResult = await axios.get('/api/songs/happy')
      const happyTracks = happyResult.data.slice(0,10)
      this.setState({songs: happyTracks})
    }
    console.log(this.state)
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
    return (
      <div className="App">
        <h1>{this.state.name}</h1>
        <h3>{this.state.temp}&deg;F</h3>
        <h3>{this.state.description}</h3>
        {this.state.songs.map(song => {
          return (
          <div>
            <img alt='' src={song.track.album.images[0].url}/>
            <div>Track name: {song.track.name}</div>
            <div>Artist: {song.track.artists[0].name}</div>
          </div>
          )
        }
        )}
        <button onClick={this.handleClick}>See my weather tunecast!</button>
      </div>
    );
  }
}

export default App;
