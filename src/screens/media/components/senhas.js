import React from "react";
import { Text, View } from "react-native";
import styles from "../styles";
import { handleType, sortSenhas } from "../../../utils/functions";
const SenhasComponent = ({ Senhas }) => {
  const list = sortSenhas(Senhas);

  return (
    <View style={styles.senhaArea}>
      <Text style={styles.senhaTitle}>Senhas</Text>
      <View
        style={[
          styles.lastSenha,
          { backgroundColor: handleType(list[0]?.type) },
        ]}
      >
        <Text style={styles.lastSenhaText}>0{list[0]?.value}</Text>
        <Text style={styles.lastweatherDate}>Mesa</Text>
      </View>
      {list?.map((item, index) => (
        <View
          key={index}
          style={[styles.senha, { backgroundColor: handleType(item.type) }]}
        >
          <Text style={styles.senhaText}>0{item.value}</Text>
          <Text style={styles.weatherDate}>Mesa</Text>
        </View>
      ))}
    </View>
  );
};

export default SenhasComponent;
