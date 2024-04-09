import React, { useState } from "react";
import {
  Alert,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "./styles";

function HomeScreen({ navigation }) {
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

  return (
    <TouchableWithoutFeedback onPress={handleShow}>
      <View style={styles.container}>
        {show && (
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={styles.button}
            >
              <Text style={styles.text}>Configurar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Sair</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default HomeScreen;
