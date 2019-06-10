import React from 'react';
import {APP_ID, APP_URL} from './config/environment.js'
import axios from 'axios'
import { Button, Icon, Grid, Image, Header, Popup } from 'semantic-ui-react'
import styled from 'styled-components' //need this to use styled spinkit
import { CubeGrid, WaveLoading } from 'styled-spinkit'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      name: '',
      temp: null,
      description: '',
      weatherId: 0,
      songs: [],
      songsLoading: false,
      weatherLoading: true, 
      buttonClicks: 0 //this prop is for conditional rendering of button 
    }
    this.getWeatherInfo = this.getWeatherInfo.bind(this)
    this.randomizeTracks = this.randomizeTracks.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  
  async componentDidMount() {
    this.getWeatherInfo()
  }

  async handleClick() {
    this.setState({songsLoading: true})
    if (this.state.temp >= 50 && this.state.temp <=75 && this.state.weatherId === 800) {
      const result = await axios.get('/api/songs/clear/warm')
      const tracks = this.randomizeTracks(result.data)
      this.setState({songs: tracks, songsLoading: false, buttonClicks: this.state.buttonClicks + 1})
    } else if (this.state.temp > 75 && this.state.weatherId === 800) {
      const result = await axios.get('/api/songs/clear/hot')
      const tracks = this.randomizeTracks(result.data)
      this.setState({songs: tracks, songsLoading: false, buttonClicks: this.state.buttonClicks + 1})
    } else if (this.state.weatherId === 2 || this.state.weatherId === 3
      || this.state.weatherId === 5 || this.state.weatherId === 8) {
      const result = await axios.get('/api/songs/rain')
      const tracks = this.randomizeTracks(result.data)
      this.setState({songs: tracks, songsLoading: false, buttonClicks: this.state.buttonClicks + 1})
    } else if (this.state.weatherId === 7) {
      const result = await axios.get('/api/songs/atmosphere')
      const tracks = this.randomizeTracks(result.data)
      this.setState({songs: tracks, songsLoading: false, buttonClicks: this.state.buttonClicks + 1})
    } else if (this.state.weatherId === 6) {
      const result = await axios.get('/api/songs/snow')
      const tracks = this.randomizeTracks(result.data)
      this.setState({songs: tracks, songsLoading: false, buttonClicks: this.state.buttonClicks + 1})
    } else {
      const result = await axios.get('/api/songs/default')
      const tracks = this.randomizeTracks(result.data)
      this.setState({songs: tracks, songsLoading: false, buttonClicks: this.state.buttonClicks + 1})
    }
  }

  randomizeTracks(arr) { 
    let copy = arr.slice()
    let randomTracks = []
    for (let i = 0; i < 20; i++) {
      //this ensures the randomTracks arr won't have duplicates
      let indexOfTrack = Math.floor(Math.random()*copy.length)
      let track = copy.splice(indexOfTrack,1)
      randomTracks.push(track[0])
    }
    return randomTracks
  }

  getWeatherInfo () {
    navigator.geolocation.getCurrentPosition(async(position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude

      try {
        const res = await fetch(`${APP_URL}?lat=${lat}&lon=${lon}&units=metric&APPID=${APP_ID}`);
        const weatherData = await res.json();
        let fahrenheight = Math.round((weatherData.main.temp)*(9/5) + 32)
        //weatherId is the first digit of available weather codes (besides clear sky case
        //where id is 800): 
        let weatherId =  Number(weatherData.weather[0].id.toString()[0])

        if (weatherData.weather[0].id === 800) {
          this.setState({weatherId: 800})
        } else {
          this.setState({weatherId: weatherId})
        }

        this.setState({name: weatherData.name,
                      temp: fahrenheight,
                      description: weatherData.weather[0].description,
                      weatherLoading: false}, () => {
                        console.log(this.state)
                      })
        // console.log(weatherData)
        // console.log(weatherData.weather[0].id)
        return weatherData
      } catch (err) {
        console.error(err)
      }
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.weatherLoading ? (
          <WaveLoading color='white' size={80}/>
        ) : (
          <Header as='h1' icon id='weather'>
            <Icon name='cloudversify' />
            {this.state.name}
            <Header.Subheader>{this.state.temp}&deg;F</Header.Subheader>
            <Header.Subheader>{this.state.description}</Header.Subheader>
          </Header>
        )}

        {this.state.songsLoading ? (
          <CubeGrid color='white' size={80}/> 
        ) : (
          <Grid relaxed columns={4}>
            {this.state.songs.map((song,index) => {
                return (
                  <Grid.Column key={index}>
                    <Popup trigger={<Image alt='' src={song.track.album.images[0].url}/>} 
                      content={`Track name: ${song.track.name}         
                                Artist: ${song.track.artists[0].name}`}
                      style={style}
                    />
                  </Grid.Column>
                )
              }
              )}
          </Grid>
        )}

        {this.state.buttonClicks === 0 ? (
          <Button style={{borderRadius: '10'}} animated='fade' onClick={this.handleClick}>
            <Button.Content visible>See my weather tunecast!</Button.Content>
            <Button.Content hidden><Icon name='music'/></Button.Content>
          </Button>
        ) : (
          <Button style={{borderRadius: '10'}} onClick={this.handleClick}>
            <Button.Content visible>Refresh my weather tunecast!</Button.Content>
          </Button>
        )}
    </div>
    );
  }
}

const style = {
  font: 'Varela Round',
  color: 'white',
  borderRadius: 4,
  backgroundColor: 'blue',
  fontWeight: 'bolder',
  opacity: 0.7,
  padding: '2em',
}


//can check main property which will say thunderstorm, drizzle, rain, etc. 
//https://openweathermap.org/weather-conditions

export default App;
