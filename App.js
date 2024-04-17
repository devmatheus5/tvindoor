import { useEffect } from "react";
import { AuthProvider } from "./src/hooks/auth";
import Routes from "./src/routes";
import * as Updates from "expo-updates";

function useAppUpdates() {
  useEffect(() => {
    async function onFetchUpdateAsync() {
      try {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        console.error("Erro ao verificar atualizações: ", error);
      }
    }

    onFetchUpdateAsync();
  }, []);
}

export default function App() {
  useAppUpdates();
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}