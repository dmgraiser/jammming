const clientID = '0bf60d2689a94b6c9d5cb9ab2520d7d7';
const redirectURI = 'http://localhost:3001/';
let accessToken = '';

let Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      const expirationTime = window.location.href.match(/expires_in=([^&]*)/)[1];
      window.setTimeout(() => accessToken = '', expirationTime * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  async search(searchTerm) {
    const searchUrl = 'https://api.spotify.com/v1/search?type=track&q=' + searchTerm;
    try {
      let response = await fetch(searchUrl, {
        headers: {'Authorization': 'Bearer ' + accessToken}
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        let tracks = jsonResponse.tracks.items.map(function(track) {
          const trackInfo = {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
          return trackInfo;
        });
        return tracks;
      }
      throw new Error('Request failed!');
    } catch(error) {
      console.log(error);
    }
  },

  async savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs) {
      return;
    }
    let userID = '';
    let playlistID = '';
    try {
      let userIDResponse = await fetch('https://api.spotify.com/v1/me', {headers: {
        'Authorization': 'Bearer ' + accessToken
        }
      });
      console.log(userIDResponse);
      if (userIDResponse.ok) {
        const jsonResponse = await userIDResponse.json();
        userID = jsonResponse.id;
      }
    } catch(error) {
      console.log(error);
    }
    try {
      let playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        method: 'POST',
        headers: {'Content-type': 'application/json',
                  'Authorization': 'Bearer ' + accessToken},
        body: JSON.stringify({name: playlistName})
      });

      if (playlistResponse.ok) {
        const jsonResponse = await playlistResponse.json();
        playlistID = jsonResponse.id;
      }
    } catch(error) {
      console.log(error);
    }
    try {
      await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
        method: 'POST',
        headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-type': 'application/json',
        },
        body: JSON.stringify({uris: trackURIs})
      });
    } catch(error) {
      console.log(error);
    }
  }

};

Spotify.getAccessToken();

export default Spotify
