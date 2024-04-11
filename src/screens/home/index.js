import React, { useEffect, useState } from "react";
import {
  Alert,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "./styles";
import { TVEventHandler, useTVEventHandler } from "react-native";
function HomeScreen({ navigation }) {
  const touchableRef = React.useRef(null);
  const configRef = React.useRef(null);
  const sairRef = React.useRef(null);
  const [focused, setFocused] = React.useState("");
  const [lastEventType, setLastEventType] = React.useState("");
  const [key, setKey] = useState("");
  const myTVEventHandler = (evt) => {
    setLastEventType(evt.eventType);
  };

  useTVEventHandler(myTVEventHandler);

  const [show, setShow] = useState(false);
  const [tap, setTap] = useState(0);

  const handleShow = () => {
    switch (tap) {
      case 0:
        setTap(1);
        break;
      case 1:
        setTap(2);
        setShow(true);
        break;
      case 2:
        setShow(false);
        setTap(0);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!lastEventType) {
      return;
    }
    if (lastEventType == "up") {
      setFocused("config");
      configRef.current.focus();
    }
  }, [lastEventType]);

  return (
    <TouchableWithoutFeedback ref={touchableRef} onPress={handleShow}>
      <View style={styles.container}>
        <Text style={{ color: "white", fontSize: 40 }}>{focused}</Text>
        <Text style={{ color: "white", fontSize: 40 }}>{lastEventType}</Text>
        <View style={styles.header}>
          <TouchableOpacity
            ref={configRef}
            onFocus={() => Alert.alert("Configurar")}
            onPress={() => navigation.navigate("Login")}
            style={[
              styles.button,
              {
                opacity: focused === "config" ? 0.5 : 1,
              },
            ]}
          >
            <Text style={styles.text}>Configurar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            ref={sairRef}
            style={[
              styles.button,
              {
                opacity: focused === "sair" ? 0.5 : 1,
              },
            ]}
          >
            <Text style={styles.text}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default HomeScreen;
