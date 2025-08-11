import {
  exchangeCodeAsync,
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
} from "expo-auth-session";
import { useEffect } from "react";
import Constants from "expo-constants";
import { updateTokens } from "../services/spotify-services";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default function useSpotifyAuth() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Code,
      clientId: Constants.expoConfig?.extra?.spotifyClientId || "",
      scopes: [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "streaming",
        "user-read-email",
        "user-read-private",
      ],
      usePKCE: true,
      redirectUri: makeRedirectUri({
        scheme: "gilster",
        path: "/",
      }),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      const codeVerifier = request?.codeVerifier || "";

      exchangeCodeAsync(
        {
          clientId: process.env.SPOTIFY_CLIENT_ID || "",
          code,
          redirectUri: makeRedirectUri({ scheme: "gilster", path: "/" }),
          extraParams: {
            code_verifier: codeVerifier,
          },
        },
        discovery
      ).then((tokenResponse) => {
        updateTokens(tokenResponse);
      });
    }
  }, [response]);

  return {
    promptAsync,
  };
}
