import {
  exchangeCodeAsync,
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
} from "expo-auth-session";
import { useEffect } from "react";
import spotifyApi from "../services/spotify-api";
import useAuthStore from "../stores/auth-store";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default function useSpotifyAuth() {
  const setAuth = useAuthStore((state) => state.setAuth);

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Code,
      clientId: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID || "",
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
        scheme: "exp",
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
          clientId: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID || "",
          code,
          redirectUri: makeRedirectUri({ scheme: "exp", path: "/" }),
          extraParams: {
            code_verifier: codeVerifier,
          },
        },
        discovery
      ).then((tokenResponse) => {
        spotifyApi.setAccessToken(tokenResponse.accessToken);

        const refreshToken = tokenResponse.refreshToken || "";
        const expiresIn = tokenResponse.expiresIn || 0;

        setAuth(
          tokenResponse.accessToken,
          refreshToken,
          tokenResponse.issuedAt * 1000 + expiresIn * 1000
        );
      });
    }
  }, [response]);

  return {
    promptAsync,
  };
}
