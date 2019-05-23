
const axios = require('axios')

//Get Token for access to Spotify API (must be done server-side)

module.exports = function getToken() {
  return axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    params: {
      grant_type: 'client_credentials',
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: '08db0d00c0484353920d8d40ded2d2d9',
      password: '4e932d463cf9402899aaa848327ffda1',
    },
  });
};




// export const test = () => {
//     s.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function(err, data) {
//         if (err) console.error(err);
//         else {
//             console.log('Artist albums', data);
//         }
//       });
// }
