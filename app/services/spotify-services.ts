import { TokenResponse } from "expo-auth-session";
import useAuthStore from "../stores/auth-store";
import spotifyApi from "./spotify-api";

export function updateTokens(tokenResponse: TokenResponse) {
  const setAuth = useAuthStore.getState().setAuth;

  spotifyApi.setAccessToken(tokenResponse.accessToken);
  if (tokenResponse.refreshToken) {
    spotifyApi.setRefreshToken(tokenResponse.refreshToken);
  }

  const refreshToken = tokenResponse.refreshToken || "";
  const expiresIn = tokenResponse.expiresIn || 0;

  setAuth(
    tokenResponse.accessToken,
    refreshToken,
    tokenResponse.issuedAt * 1000 + expiresIn * 1000
  );
}

async function beforeApiCall() {
  try {
    const expiresAt = useAuthStore.getState().expiresAt;

    if (new Date().getTime() > expiresAt - 10000) {
      const url = "https://accounts.spotify.com/api/token";
      const body = `grant_type=refresh_token&refresh_token=${encodeURIComponent(
        spotifyApi.getRefreshToken() || ""
      )}&client_id=${encodeURIComponent(spotifyApi.getClientId() || "")}`;

      const payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      };
      const response = await fetch(url, payload);
      const data = await response.json();

      updateTokens(data);
    }
  } catch (err) {
    console.error("Error refreshing access token:", err);
  }
}

export const play = async (uri: string, device?: string) => {
  await beforeApiCall();

  return spotifyApi.play({ uris: [uri], device_id: device });
};

export const pause = async () => {
  await beforeApiCall();

  return spotifyApi.pause();
};

export const getDevice = async () => {
  await beforeApiCall();

  const answer = await spotifyApi.getMyDevices();
  const devices = answer.body.devices;

  const smartphones = devices.filter((device) => device.type === "Smartphone");
  const tablets = devices.filter((device) => device.type === "Tablet");

  return smartphones[0] || tablets[0] || null;
};
