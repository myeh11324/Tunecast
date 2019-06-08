
const axios = require('axios')
const express = require('express')
const app = express()
module.exports = app

const SpotifyWebApi = require('spotify-web-api-node');
const getToken  = require('./SpotifyAuth.js');
const SPOTIFY_CLIENT_ID = require('./Spotify')
const SPOTIFY_CLIENT_SECRET = require('./Spotify')

const port = 5000

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());


const spotifyApi = new SpotifyWebApi({
    clientId: SPOTIFY_CLIENT_ID,
    clientSecret: SPOTIFY_CLIENT_SECRET
  });

  const tokenPromise = getToken()
  
  //cold & snow (weatherId 6)
  app.get('/api/songs/snow', async (req, res) => {
    const token = (await tokenPromise).data.access_token
    try {
      const result = await axios({
          method: 'get',
          url: `https://api.spotify.com/v1/playlists/37i9dQZF1DX4H7FFUM2osB`,
          headers: { Authorization: `Bearer ${token}`,
                     'Content-Type': 'application/json' },
        });
        res.send(result.data.tracks.items) //array of objects
    } catch (error) {
        console.error(error)
    }
  })

  //rain or clouds (weatherId 2, 3, 5, 8)
  app.get('/api/songs/rain', async (req, res) => {
      const token = (await tokenPromise).data.access_token
      try {
        const result = await axios({
            method: 'get',
            url: `https://api.spotify.com/v1/playlists/37i9dQZF1DWZUAeYvs88zc`,
            headers: { Authorization: `Bearer ${token}`,
                       'Content-Type': 'application/json' },
          });
          res.send(result.data.tracks.items) //array of objects
        //   console.log(result)
      } catch (error) {
          console.error(error)
      }
  })


  //Atmospheric instrumentals (weatherId 7)
  app.get('/api/songs/atmosphere', async (req, res) => {
    const token = (await tokenPromise).data.access_token
    try {
      const result = await axios({
          method: 'get',
          url: `https://api.spotify.com/v1/playlists/37i9dQZF1DWZd79rJ6a7lp`,
          headers: { Authorization: `Bearer ${token}`,
                     'Content-Type': 'application/json' },
        });
        res.send(result.data.tracks.items) //array of objects
      //   console.log(result)
    } catch (error) {
        console.error(error)
    }
  })
  
  //clear and warm (50 <= temp <= 75, weatherId 800)
  app.get('/api/songs/clear/warm', async (req, res) => {
    const token = (await tokenPromise).data.access_token;
    try {
        const result = await axios({
        method: 'get',
        url: `https://api.spotify.com/v1/playlists/37i9dQZF1DWWBHeXOYZf74`,
        headers: { Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json' },
        });
        res.json(result.data.tracks.items) //array of objects
    } catch (error) {
        console.error(error);
    }
  })

  //clear and hot (temp > 75, weatherId 800)
  app.get('/api/songs/clear/hot', async (req, res) => {
    const token = (await tokenPromise).data.access_token;
    try {
        const result = await axios({
        method: 'get',
        url: `https://api.spotify.com/v1/playlists/0mmqC3RIi8h7nApdD9gV7x`,
        headers: { Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json' },
        });
        res.json(result.data.tracks.items) //array of objects
    } catch (error) {
        console.error(error);
    }
  })

  //let's default to bossa nova
  app.get('/api/songs/default', async (req, res) => {
    const token = (await tokenPromise).data.access_token;
    try {
        const result = await axios({
        method: 'get',
        url: `https://api.spotify.com/v1/playlists/37i9dQZF1DX4AyFl3yqHeK`,
        headers: { Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json' },
        });
        res.json(result.data.tracks.items) //array of objects
    } catch (error) {
        console.error(error);
    }
  })

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../public/index.html'))
  });
 
  app.listen(port, () => console.log(`Listening on port ${port}`));

// Keep for testing purposes/seeing data result:
//   async function playlistSongs() {
//     const token = (await tokenPromise).data.access_token;
//     try {
//       const result = await axios({
//         method: 'get',
//         url: `https://api.spotify.com/v1/playlists/37i9dQZF1DX1BzILRveYHb`,
//         headers: { Authorization: `Bearer ${token}`,
//                    'Content-Type': 'application/json' },
//       });
//     // console.log(result.data.tracks.items[4].track.album.name) //Album name 
//       return result.data;
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   module.exports = playlistSongs

//   playlistSongs()