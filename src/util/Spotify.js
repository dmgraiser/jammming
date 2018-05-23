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
  }
};

Spotify.getAccessToken();

export default Spotify
