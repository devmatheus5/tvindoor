import React from "react";
import { Text, View } from "react-native";
import styles from "../styles";
import { handleType, sortSenhas } from "../../../utils/functions";
const SenhasComponent = ({ Senhas }) => {
  const list = sortSenhas(Senhas);

  return (
    <View style={styles.senhaArea}>
      <Text style={styles.senhaTitle}>Senha</Text>

      <View
        style={[
          styles.lastSenha,
          {
            backgroundColor: handleType(list[0]?.type),
          },
        ]}
      >
        <Text numberOfLines={1} style={styles.lastSenhaText}>
          0{list[0]?.value}
        </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.outrasSenhas}>
        <Text style={styles.senhaTitle}>Anteriores</Text>

        {list?.map((item, index) => (
          <View
            key={index}
            style={[
              styles.senha,
              {
                backgroundColor: handleType(item.type),
                display: index == 0 ? "none" : "flex",
              },
            ]}
          >
            <Text style={styles.senhaText}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default SenhasComponent;
