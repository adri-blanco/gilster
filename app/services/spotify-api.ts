import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID || "",
});

export default spotifyApi;
