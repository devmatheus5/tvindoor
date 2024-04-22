import { useEffect, useState } from "react";
import { AuthProvider } from "./src/hooks/auth";
import Routes from "./src/routes";
import * as Updates from "expo-updates";
import * as SplashScreen from "expo-splash-screen";

function useAppUpdates(setIsReady) {
  useEffect(() => {
    async function onFetchUpdateAsync() {
      try {
        await SplashScreen.preventAutoHideAsync();
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
        setIsReady(true);
      } catch (error) {
        setIsReady(true);
      }
    }

    onFetchUpdateAsync();
  }, []);
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useAppUpdates(setIsReady);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
