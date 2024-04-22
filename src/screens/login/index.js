import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useTVEventHandler,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../../hooks/auth";
import { Intervalos } from "../../services/values";
import styles from "./styles";

function LoginScreen({ navigation }) {
  const userRef = useRef();
  const passwordRef = useRef();
  const intervalRef = useRef();
  const { value } = useContext(AuthContext);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [intervalGap, setIntervalGap] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ user: "", password: "" });

  const validateInputs = () => {
    if (!user || user.length < 5) {
      return "Preencha um usuário válido";
    }
    if (!password || password.length < 5) {
      return password.length < 5
        ? "Senha deve ter 5 dígitos"
        : "Preencha uma senha válida";
    }
    return null;
  };

  const handleSave = async () => {
    setLoading(true);
    setError({ user: "", password: "" });

    const validationError = validateInputs();
    if (validationError) {
      setError({ ...error, user: validationError });
      setLoading(false);
      return;
    }

    try {
      const result = await value.Login(
        user.trim(),
        password.trim(),
        intervalGap
      );
      if (result) {
        navigation.navigate("Media");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      Alert.alert("Erro", "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = (ref) => {
    ref.current.focus();
  };

  return (
    <View style={styles.inner}>
      <View style={styles.header}>
        <Text style={styles.title}>Configurar estação</Text>
      </View>
      <View style={styles.inputAreaLandscape}>
        <View style={styles.box}>
          {error.user ? (
            <Text style={styles.errorMensage}>{error.user}</Text>
          ) : null}
          <Text style={styles.label}>Usuário</Text>
          <TextInput
            ref={userRef}
            autoCapitalize="none"
            showSoftInputOnFocus={false}
            autoComplete="off"
            placeholderTextColor={"#fff"}
            value={user}
            onChangeText={setUser}
            style={styles.input}
            placeholder="Usuário"
            onSubmitEditing={() => handleNext(passwordRef)}
          />
        </View>
        <View style={styles.box}>
          {error.password ? (
            <Text style={styles.errorMensage}>{error.password}</Text>
          ) : null}

          <Text style={styles.label}>Senha</Text>
          <View style={styles.boxSenha}>
            <TextInput
              autoCapitalize="none"
              autoComplete="off"
              secureTextEntry={!show}
              value={password}
              showSoftInputOnFocus={false}
              onChangeText={setPassword}
              placeholderTextColor={"#fff"}
              style={styles.inputSenha}
              placeholder="Senha"
              ref={passwordRef}
              onSubmitEditing={() => handleNext(intervalRef)}
            />
            <TouchableOpacity
              onPress={() => setShow(!show)}
              style={[styles.buttonSenha]}
            >
              <Feather
                name={show ? "eye" : "eye-off"}
                size={24}
                color={"white"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.box}>
          <Text style={styles.label}>Intervalo de atualização</Text>
          <Picker
            ref={intervalRef}
            dropdownIconColor={"#fff"}
            placeholderTextColor={"#fff"}
            style={styles.inputSenha}
            selectedValue={intervalGap}
            onValueChange={(itemValue, itemIndex) => {
              setIntervalGap(itemValue);
            }}
          >
            {Intervalos.map((item) => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        </View>
        <TouchableOpacity
          onPress={() => handleSave()}
          disabled={loading}
          style={styles.button}
        >
          <Text style={styles.text}>{loading ? "Salvando" : "Salvar"}</Text>
          <ActivityIndicator animating={loading} color="#fff" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default LoginScreen;
