module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      ...config.extra,
      spotifyClientId: process.env.SPOTIFY_CLIENT_ID || "default-client-id",
    },
  };
};
