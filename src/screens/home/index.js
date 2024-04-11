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

    if (focused == "") {
      switch (lastEventType) {
        case "select":
          handleShow();
          break;
        case "up":
          if (show) {
            setFocused("config");
            configRef.current && configRef.current.focus();
          } else {
            handleShow();
          }
          break;
        case "down":
          break;
        case "left":
          break;
        case "right":
          break;
        default:
          handleShow();
          break;
      }
    } else if (focused == "config") {
      switch (lastEventType) {
        case "select":
          navigation.navigate("Login");
          setFocused("");
          configRef.current.blur();
          break;
        case "up":
          break;
        case "down":
          setFocused("");
          configRef.current.blur();
          break;
        case "left":
          break;
        case "right":
          setFocused("sair");
          sairRef.current.focus();

          break;
        default:
          break;
      }
    } else if (focused == "sair") {
      switch (lastEventType) {
        case "select":
          setFocused("");
          sairRef.current.blur();
          setShow(false);
          break;
        case "up":
          break;
        case "down":
          setFocused("");
          sairRef.current.blur();
          break;
        case "left":
          setFocused("config");
          configRef.current.focus();
          break;
        case "right":
          break;
        default:
          break;
      }
    }
  }, [lastEventType]);

  return (
    <TouchableWithoutFeedback ref={touchableRef} onPress={handleShow}>
      <View style={styles.container}>
        {show && (
          <View style={styles.header}>
            <TouchableOpacity
              ref={configRef}
              onFocus={() => Alert.alert("Configurar")}
              onPress={() => navigation.navigate("Login")}
              style={[
                styles.button,
                {
                  opacity: focused === "config" ? 1 : 0.7,
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
                  opacity: focused === "sair" ? 1 : 0.7,
                },
              ]}
            >
              <Text style={styles.text}>Sair</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default HomeScreen;
