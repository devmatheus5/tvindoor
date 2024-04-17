import React, { useEffect, useRef, useState } from "react";
import {
  Linking,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "./styles";
import { useTVEventHandler } from "react-native";
function HomeScreen({ navigation }) {
  const [selectCount, setSelectCount] = useState(0);
  const buttons = useRef([
    {
      ref: useRef(),
      label: "Configurar",
      onPress: () => navigation.navigate("Login"),
    },
    {
      ref: useRef(),
      label: "Sair",
      onPress: () => Linking.sendIntent("android.intent.action.MAIN"),
    },
  ]);
 
  return (
    <TouchableWithoutFeedback onPress={() => {setSelectCount((prev) => prev + 1);
      if (selectCount == 2) {
        setSelectCount(0);
      }
    }}>
      <View style={styles.container}>
       { selectCount == 2 && <View style={styles.header}>
          {buttons.current.map((button, i) => (
            <TouchableOpacity
              key={i}
              ref={button.ref}
              style={
                styles.button
              
              }
              onPress={button.onPress}
            >
              <Text style={styles.text}>{button.label}</Text>
            </TouchableOpacity>
          ))}
         
        </View>}
        

      </View>
    </TouchableWithoutFeedback>
  );
}

export default HomeScreen;