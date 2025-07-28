import { useShallow } from "zustand/react/shallow";
import useAppStore from "../stores/app-store";

export const isLoggedIn = () => {
  const [accessToken, refreshToken, expiresAt] = useAppStore(
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
