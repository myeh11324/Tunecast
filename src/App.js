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
      songs: [],
      weatherLoading: true
    }
    this.getWeatherInfo = this.getWeatherInfo.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  
  async componentDidMount() {
    this.getWeatherInfo()
    // console.log(weatherInfo)
    // console.log(tracks)
    // console.log('TEST IMG URL', tracks[0].track.album.images[0].url) //this works
  }

  async handleClick() {
    if (this.state.temp <= 50) {
      const sadResult = await axios.get('/api/songs/sad')
      const sadTracks = sadResult.data.slice(0,10)
      this.setState({songs: sadTracks})
    } else {
      const happyResult = await axios.get('/api/songs/happy')
      const happyTracks = happyResult.data.slice(0,12)
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
                      description: weatherData.weather[0].description,
                      weatherLoading: false})
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

        {!this.state.songs ? (
          <CubeGrid color='white' size={80}/> //doesn't actually show but leave just in case..
        ) : (
          <Grid relaxed columns={4}>
            {this.state.songs.map(song => {
                return (
                  <Grid.Column>
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
      
        <Button style={{borderRadius: '10'}} animated='fade' onClick={this.handleClick}>
          <Button.Content visible>See my weather tunecast!</Button.Content>
          <Button.Content hidden><Icon name='music'/></Button.Content>
        </Button>
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

//descriptions: light rain,heavy intensity rain, clear sky, few clouds, scattered clouds
//can check main property which will say thunderstorm, drizzle, rain, etc. 
//https://openweathermap.org/weather-conditions

export default App;
