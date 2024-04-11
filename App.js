import { useEffect } from "react";
import { AuthProvider } from "./src/hooks/auth";
import Routes from "./src/routes";
import * as Updates from "expo-updates";
import { Alert } from "react-native";
export default function App() {
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
        Alert.alert("Atualização", "Atualização realizada com sucesso!");
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }
  useEffect(() => {
    onFetchUpdateAsync();
  }, []);
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
