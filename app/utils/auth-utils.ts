import { useShallow } from "zustand/react/shallow";
import useAuthStore from "../stores/auth-store";

export const isLoggedIn = () => {
  const [accessToken, refreshToken, expiresAt] = useAuthStore(
    useShallow((state) => [
      state.accessToken,
      state.refreshToken,
      state.expiresAt,
    ])
  );

  return (
    accessToken !== null &&
    refreshToken !== null &&
    expiresAt > new Date().getTime()
  );
};
