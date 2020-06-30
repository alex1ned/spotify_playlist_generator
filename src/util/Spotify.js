// Insert your developer client ID here.
const clientId = 'ade2e3e48af74f768359d3f6390b18f0';

// Have to add this to your accepted Spotify redirect URIs on the Spotify API.
const redirectUri = 'http://xant-design.com/';
// const redirectUri = 'http://localhost:3000/';


//--------------------------------------------------

let accessToken;

const Spotify = {

  //--------------------------------------------------------
  //Method that gets the access Token of the user
  getAccessToken()
  {
    if (accessToken)
    {
      return accessToken;
    }
    //If the access token ('AT') is not yet set we use the 'Implicit Grant Flow'
    //of the Spotify API, which returns the AT of the USER in the URL.
    //We then check the URL for the AT and when it expires
    else
    {
      //First check the URL for an AT match...
      //... and when the AT expires (both saved to variables)
      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        //'window.location.href' returns the url we are currently on
        //'.match()' is a method that checks the URL for a specfic pattern
        //using regex
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

      if (accessTokenMatch && expiresInMatch)
      {
        //Set the access token to index 1 (i.e. it is the Group 1 of the regex
        //thus it does not include the phrase 'access_token=')
        accessToken = accessTokenMatch[1];

        //Create exirationIn variable similar to above BUT need to wrap
        //JS method Number() around it to parse it as a number
        const expiresIn = Number(expiresInMatch[1]);

        //Clear the parameters from the URL, so the app doesn’t try grabbing
        //the access token after it has expired (a bit unclear)
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      }

      //If the access token variable is empty and is not in the URL...
      else
      {
        //Set variable with the YOUR client ID and redirectUri and ...
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        //using the below actually redirect the browser
        window.location = accessUrl;
      }
    }
  },


  //--------------------------------------------------------
  search(term)
  {
    const accessToken = Spotify.getAccessToken();
    const endPoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    const authorizationHeader = {
      headers: {Authorization: `Bearer ${accessToken}`}
    };

    return fetch(endPoint, authorizationHeader)
    //Convert the response to a JSON format (JSON means JS object notation)
    .then( (response) => {
      if (response.ok)
      {
        return response.json();
      }
    })
    //Once this is complete, map the converted JSON to an array of tracks.
    //If the JSON does not contain any tracks, return an empty array.
    .then( (jsonRespone) => {
      //If there are no tracks in the response
      if (!jsonRespone.tracks)
      {
        return [];
      }
      //If there is a respone with tracks
      else
      {
        return jsonRespone.tracks.items.map( (track) => ({
          id: track.id,
          name: track.name,
          artists: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      }
    })
  },


  //--------------------------------------------------------

  savePlaylist(name, trackUris)
  {
    if (!name || !trackUris.length)
    {
      return;
    }
    else
    {
      const accessToken = Spotify.getAccessToken();
      const endPoint = 'https://api.spotify.com/v1/me';
      const authorizationHeader = {
        Authorization: `Bearer ${accessToken}`
      };
      let userId;

      return fetch(endPoint, {headers: authorizationHeader})
      .then( (response) => response.json())
      .then( (jsonRespone => {
        userId = jsonRespone.id;
        const secondEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;

        return fetch(secondEndpoint,
          {
            headers: authorizationHeader,
            method: 'POST',
            body: JSON.stringify({name: name})
          })
        .then( (response) => response.json())
        .then( (jsonRespone) => {
          const playlistId = jsonRespone.id;
          const thirdEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;

          return fetch(thirdEndpoint,
            {
              headers: authorizationHeader,
              method: 'POST',
              body: JSON.stringify({uris: trackUris})
            })
        })
      }));
    }
  }

};

export default Spotify;
