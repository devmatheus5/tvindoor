import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const Login = async (usuario, password, intervalGap) => {
    const data = {
      usuario,
      station: "002478",
      token: "123456789",
      intervalo: intervalGap,
      hnews: true,
      cidade: "petrolina",
    };
    try {
      Alert.alert("Login", "Realizando login...");
      await AsyncStorage.setItem("@user", JSON.stringify(data));
      setLoggedIn(true);
      Alert.alert("Sucesso", "Login realizado com sucesso!");
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
    setUser(JSON.parse(user));
    setLoggedIn(true);
  };

  useEffect(() => {
    checkLogin();
  }, []);
  const value = { loggedIn, Login, logout, user, setUser };

  return (
    <AuthContext.Provider value={{ value }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
