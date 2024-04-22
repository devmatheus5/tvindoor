import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currentMedia, setCurrentMedia] = useState("news");

  const [isMuted, setIsMuted] = useState(false);
  const videoDirectory = FileSystem.documentDirectory + "videos";
  const baseUrl = "https://api.rutherles.pt";
  const api = baseUrl + "/api";
  const [intervalo, setIntervalo] = useState(60);

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

  const Login = async (user, password, intervalGap) => {
    const data = {
      email: user,
      password: password,
    };
    await axios
      .post(api + "/login", data)
      .then((res) => {
        setUser(res.data.user);
        AsyncStorage.setItem("@user", JSON.stringify(res.data.user));
        AsyncStorage.setItem("@intervalo", JSON.stringify(intervalGap));
        setIntervalo(intervalGap);
        setLoggedIn(true);
        return res.data.user;
      })
      .catch((error) => {
        console.error("Erro ao fazer login", error);
      });
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
    const interval = await AsyncStorage.getItem("@intervalo");
    if (interval) {
      setIntervalo(JSON.parse(interval));
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
    intervalo,
    api,
  };

  return (
    <AuthContext.Provider value={{ value }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
