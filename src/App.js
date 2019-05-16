import React from 'react';
import getWeather from './utilityfuncs/getWeather.js'
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
    getWeather()
    .then(res => res.json()) 
    .then(data => this.setState({name:data.name}))
  }

  // getWeatherInfo = async () => {
  //   let info = await getWeather()
    
  //   console.log(info)
  // }

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
