import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
      await AsyncStorage.setItem("@user", JSON.stringify(data));
      setLoggedIn(true);
      return true;
    } catch (error) {
      console.log(error);
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

  const value = { loggedIn, Login, logout, user };

  return (
    <AuthContext.Provider value={{ value }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
