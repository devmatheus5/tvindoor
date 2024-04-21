import React, { useEffect, useRef, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../styles";
import { handleType, sortSenhas } from "../../../utils/functions";
const SenhasComponent = ({ Senhas, isMuted, handleIsMuted }) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(sortSenhas(Senhas));
  }, [Senhas]);

  const translateXAnimation = useRef(new Animated.Value(0)).current;
  const startAnimation = () => {
    Animated.loop(
      Animated.timing(translateXAnimation, {
        toValue: -100,
        duration: 5000,
        useNativeDriver: true,
      })
    ).start();
  };
  useEffect(() => {
    startAnimation();
  }, [translateXAnimation]);

  return (
    <View style={styles.senhaArea}>
      <Text style={styles.senhaTitle}>Senha</Text>

      <TouchableOpacity
        style={styles.senhaMuteButton}
        onPress={() => {
          handleIsMuted();
        }}
      >
        <MaterialCommunityIcons
          name={isMuted ? "volume-off" : "volume-high"}
          size={24}
          color="white"
        />
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.outrasSenhas}
      >
        {list?.map((item, index) => {
          return (
            <View
              key={index}
              style={[
                styles.senha,
                {
                  backgroundColor: handleType(item.type),
                  display: isNaN(item?.value) ? "none" : "flex",
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
              <ScrollView horizontal style={{}}>
                <Animated.Text
                  style={[
                    styles.senhaText,
                    {
                      transform:
                        item.value.toString().length > 4
                          ? [{ translateX: translateXAnimation }]
                          : [],
                      paddingHorizontal: 10,
                    },
                  ]}
                >
                  {item.value}
                </Animated.Text>
              </ScrollView>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SenhasComponent;
