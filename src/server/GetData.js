
const getToken  = require('./SpotifyAuth.js');
const SpotifyWebApi = require('spotify-web-api-node');
const SPOTIFY_CLIENT_ID = require('./Spotify')
const SPOTIFY_CLIENT_SECRET = require('./Spotify')
const axios = require('axios')

const spotifyApi = new SpotifyWebApi({
    clientId: SPOTIFY_CLIENT_ID,
    clientSecret: SPOTIFY_CLIENT_SECRET
  });

  const tokenPromise = getToken()
  
  async function playlistSongs() {
    const token = (await tokenPromise).data.access_token;
    try {
      const result = await axios({
        method: 'get',
        url: `https://api.spotify.com/v1/playlists/37i9dQZF1DX7qK8ma5wgG1`,
        headers: { Authorization: `Bearer ${token}`,
                   'Content-Type': 'application/json' },
      });
    //   console.log(result.data)
    console.log(result.data.tracks.items[4].track.album.name) //Album name 
      return result.data;
    } catch (err) {
      console.error(err);
    }
  }

  playlistSongs()