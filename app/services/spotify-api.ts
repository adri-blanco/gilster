import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi();

export const play = (uri: string) => {
  return spotifyApi.play({ uris: [uri] });
};

export const pause = () => {
  return spotifyApi.pause();
};

export default spotifyApi;
