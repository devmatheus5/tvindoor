import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "./styles";
import { useTVEventHandler } from "react-native";

function HomeScreen({ navigation }) {
  const [focused, setFocused] = useState(0);
  const [lastEventType, setLastEventType] = React.useState("");
  const refs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);
  const onPressHandlers = [
    () => Alert.alert("Button 1 pressed"),
    () => Alert.alert("Button 2 pressed"),
    () => Alert.alert("Button 3 pressed"),
  ];

  const myTVEventHandler = (evt) => {
    setLastEventType(evt.eventType);
    if (evt.eventType === "right" && evt.eventKeyAction == 0) {
      setFocused((prev) => (prev + 1) % 3);
    } else if (evt.eventType === "left" && evt.eventKeyAction == 0) {
      setFocused((prev) => (prev - 1 + 3) % 3);
    } else if (evt.eventType === "select" && evt.eventKeyAction == 0) {
      onPressHandlers[focused]();
    }
  };

  useTVEventHandler(myTVEventHandler);

  useEffect(() => {
    if (refs.current[focused]) {
      refs.current[focused].current.focus();
    }
  }, [focused]);

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <View style={styles.header}>
          {Array.from({ length: 3 }).map((_, i) => (
            <TouchableOpacity
              key={i}
              ref={refs.current[i]}
              onFocus={() => {
                setFocused(i);
                console.log("focused", i);
              }}
              onBlur={() => console.log("blurred", i)}
              style={[
                styles.button,
                focused === i && { backgroundColor: "red" },
              ]}
              onPress={onPressHandlers[i]}
            >
              <Text style={styles.text}>Button {i + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text
          style={{
            color: "white",
            fontSize: 30,
            textAlign: "center",
            marginBottom: 50,
          }}
        >
          {lastEventType}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default HomeScreen;
