import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";
import styles from "../styles";
import { handleType, sortSenhas } from "../../../utils/functions";
const SenhasComponent = ({ Senhas }) => {
  const list = sortSenhas(Senhas);

  return (
    <View style={styles.senhaArea}>
      <Text style={styles.senhaTitle}>Senha</Text>

      <View style={styles.outrasSenhas}>
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
            <View style={styles.senhaFooter}>
            <Text style={styles.outrasSenhasTitle}>
                {item.type == "balcao"
                  ? "Balcão"
                  : item.type == "garcom"
                  ? "Garçom"
                  : "Conta"}
              </Text>
              <MaterialCommunityIcons
                style={{
                  
                  opacity: 0.8,
                }}
                name={
                  item.type == "garcom"
                    ? "bell-ring"
                    : item.type == "balcao"
                    ? "account-cog"
                    : "text-box-check"
                }
                size={16}
                color="white"
              />

            </View>
            <Text style={styles.senhaText}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default SenhasComponent;
