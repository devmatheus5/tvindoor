import React, { useRef } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Animated, Image, ScrollView, Text, View } from "react-native";
import styles from "../styles";
import { handleType, sortSenhas } from "../../../utils/functions";
const SenhasComponent = ({ Senhas }) => {
  const list = sortSenhas(Senhas);
  const translateXAnimation = useRef(new Animated.Value(1)).current;

  return (
    <View style={styles.senhaArea}>
      <Text style={styles.senhaTitle}>Senha</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.outrasSenhas}
      >
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
            <Text
              numberOfLines={1}
              style={[
                styles.senhaText,
                {
                  transform: [{ translateX: item.value.length > 3 ? -10 : 0 }],
                },
              ]}
            >
              {item.value}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SenhasComponent;
