import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import * as FileSystem from "expo-file-system";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currentMedia, setCurrentMedia] = useState("news");
  const [isMuted, setIsMuted] = useState(false);
  const videoDirectory = FileSystem.documentDirectory + "videos";
  const baseUrl = "https://dev.rutherles.pt/";
  const createVideoDirectory = async () => {
    const dir = await FileSystem.getInfoAsync(videoDirectory);
    if (!dir.exists) {
      await FileSystem.makeDirectoryAsync(videoDirectory);
    }
  };
  const handleIsMuted = async () => {
    await AsyncStorage.setItem("@isMuted", JSON.stringify(!isMuted));
    setIsMuted(!isMuted);
  };
  const Login = async (user, password, intervalGap, city) => {
    const data = {
      usuario: user,
      station: user,
      token: "985476258",
      intervalo: intervalGap,
      hnews: true,
      cidade: city,
    };
    try {
      await AsyncStorage.setItem("@user", JSON.stringify(data));
      setUser(data);
      setLoggedIn(true);

      return true;
    } catch (error) {
      Alert.alert("Erro", "Erro ao realizar login");
      return false;
    }
  };

  const logout = () => {
    AsyncStorage.clear();
    setLoggedIn(false);
  };

  const checkLogin = async () => {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      return;
    }
    const muted = await AsyncStorage.getItem("@isMuted");
    if (muted) {
      setIsMuted(JSON.parse(muted));
    }

    setUser(JSON.parse(user));
    setLoggedIn(true);
    createVideoDirectory();
  };

  useEffect(() => {
    checkLogin();
  }, []);
  const value = {
    loggedIn,
    Login,
    logout,
    user,
    setUser,
    currentMedia,
    setCurrentMedia,
    videoDirectory,
    baseUrl,
    isMuted,
    handleIsMuted,
  };

  return (
    <AuthContext.Provider value={{ value }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
