import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const Login = async (user, password, intervalGap) => {
    if (user === "admin" && password === "admin") {
      const token = "123456789";
      const intervalo = JSON.stringify(intervalGap);

      await AsyncStorage.multiSet([
        ["@token", token],
        ["@intervalo", intervalo],
      ]);
      setLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    AsyncStorage.clear();
    setLoggedIn(false);
  };

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem("@token");
    setLoggedIn(token ? true : false);
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, Login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
