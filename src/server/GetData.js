
const axios = require('axios')
const express = require('express')
const app = express()
const SpotifyWebApi = require('spotify-web-api-node');
const getToken  = require('./SpotifyAuth.js');
const SPOTIFY_CLIENT_ID = require('./Spotify')
const SPOTIFY_CLIENT_SECRET = require('./Spotify')

const spotifyApi = new SpotifyWebApi({
    clientId: SPOTIFY_CLIENT_ID,
    clientSecret: SPOTIFY_CLIENT_SECRET
  });

  const tokenPromise = getToken()
  
  //sad playlist
  app.get('/songs/sad', async (req, res, next) => {
      const token = (await tokenPromise).data.access_token
      try {
        const result = await axios({
            method: 'get',
            url: `https://api.spotify.com/v1/playlists/37i9dQZF1DWZUAeYvs88zc`,
            headers: { Authorization: `Bearer ${token}`,
                       'Content-Type': 'application/json' },
          });
          res.json(result.data.tracks.items) //array of objects
        //   console.log(result)
      } catch (error) {
          console.error(error)
      }
  })

  //happy playlist
  app.get('/songs/happy', async (req, res, next) => {
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



//Keep for testing purposes/seeing data result:
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

//   playlistSongs()