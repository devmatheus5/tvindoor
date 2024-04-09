import React from "react";
import { Text, View } from "react-native";
import { Senhas } from "../../../services/values"; // Importe o array de senhas
import styles from "../styles";
import { handleType } from "../../../utils/functions";

const SenhasComponent = () => {
  return (
    <>
      {Senhas.reverse().map((senha, index) => (
        <View
          key={index}
          style={[styles.senha, { backgroundColor: handleType(senha.type) }]}
        >
          <Text style={styles.senhaText}>0{senha.value}</Text>
          <Text style={styles.weatherDate}>Mesa</Text>
        </View>
      ))}
    </>
  );
};

export default React.memo(SenhasComponent, (prevProps, nextProps) => {
  // Compare o conteúdo do array Senhas para determinar se deve re-renderizar
  return JSON.stringify(prevProps.Senhas) === JSON.stringify(nextProps.Senhas);
});
