import React, { useRef, useState } from "react";
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
  const [focused, setFocused] = useState(0);
  const [show, setShow] = useState(false);
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
  const handleFocusChange = (direction) => {
    setFocused((prev) => (prev + direction + 2) % 2);
  };
  const myTVEventHandler = (evt) => {
    if (evt.eventType === "down" && evt.eventKeyAction == 1) {
      setShow(false);
    } else if (evt.eventType === "right" && evt.eventKeyAction == 1) {
      handleFocusChange(1);
    } else if (evt.eventType === "left" && evt.eventKeyAction == 1) {
      handleFocusChange(-1);
    } else if (evt.eventType === "select" && evt.eventKeyAction == 1) {
      if (!show) {
        setSelectCount((prev) => prev + 1);
        if (selectCount >= 1) {
          setShow(true);
          setSelectCount(0);
        }
      } else {
        buttons.current[focused].onPress();
      }
    }
  };
  useTVEventHandler(myTVEventHandler);
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <View style={styles.header}>
          {buttons.current.map((button, i) => (
            <TouchableOpacity
              key={i}
              ref={button.ref}
              style={[
                styles.button,
                focused === i && { backgroundColor: "white" },
              ]}
              onPress={button.onPress}
            >
              <Text style={styles.text}>{button.label}</Text>
            </TouchableOpacity>
          ))}
          {!show && (
            <TouchableWithoutFeedback onPress={() => setSelectCount((prev) => prev + 1)}>
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "black",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default HomeScreen;