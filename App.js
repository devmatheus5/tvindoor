import { useEffect } from "react";
import { AuthProvider } from "./src/hooks/auth";
import Routes from "./src/routes";
import { StatusBar } from "react-native";
export default function App() {
  return (
    <AuthProvider>
      <StatusBar hidden />
      <Routes />
    </AuthProvider>
  );
}
