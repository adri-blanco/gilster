import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi();

export const play = (uri: string, device?: string) => {
  return spotifyApi.play({ uris: [uri], device_id: device });
};

export const pause = () => {
  return spotifyApi.pause();
};

export const getDevice = async () => {
  const answer = await spotifyApi.getMyDevices();
  const devices = answer.body.devices;

  const smartphones = devices.filter((device) => device.type === "Smartphone");
  const tablets = devices.filter((device) => device.type === "Tablet");

  return smartphones[0] || tablets[0] || null;
};

export default spotifyApi;
