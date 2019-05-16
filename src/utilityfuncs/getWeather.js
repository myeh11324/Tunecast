
const APP_ID = '98d3e66628ff6f35bfd347d523b2413e';
const APP_URL = `http://api.openweathermap.org/data/2.5/weather`;

const getWeather = () => {
    navigator.geolocation.getCurrentPosition(async function(position) {
      let lat = position.coords.latitude
      let lon = position.coords.longitude

      try {
        const res = await fetch(`${APP_URL}?lat=${lat}&lon=${lon}&units=metric&APPID=${APP_ID}`);
        const weatherData = await res.json();
        // console.log(weatherData.name, weatherData.main.temp, weatherData.weather[0].description)

        //conversion (7.1°C × 9/5) + 32 = 44.78°F
        return weatherData;
    } catch (err) {
        console.error(err)
    }   
    })
};

export default getWeather

