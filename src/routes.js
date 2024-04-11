// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/home";
import LoginScreen from "./screens/login";
import MediaScreen from "./screens/media";
import { AuthContext } from "./hooks/auth";

const Stack = createNativeStackNavigator();

function Routes() {
  const { value } = React.useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {value.loggedIn ? (
          <Stack.Screen
            options={{
              headerShown: false,
              title: "Media",
            }}
            name="Media"
            component={MediaScreen}
          />
        ) : (
          <>
            <Stack.Screen
              options={{
                title: "Login",
                headerShown: true,
                headerBackButtonMenuEnabled: true,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#000",
                },
              }}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                title: "Home",
              }}
              name="Home"
              component={HomeScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
