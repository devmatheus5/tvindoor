
import React, { useContext, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../../hooks/auth";
import { Intervalos } from "../../services/values";
import styles from "./styles";

function LoginScreen({ navigation }) {
  const passwordRef = useRef();
  const { value } = useContext(AuthContext);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [intervalGap, setIntervalGap] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ user: "", password: "" });

  const validateInputs = () => {
    if (!user) {
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
      const result = await value.Login(user, password, intervalGap);
      if (result) {
        navigation.navigate("Media");
      } else {
        Alert.alert("Erro", "Usuário ou senha inválidos");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = (ref) => {
    ref.current.focus();
  };
return (
  <KeyboardAvoidingView style={styles.container} behavior="height">
  <View style={styles.inner}>
    <View style={styles.header}>
      <Text style={styles.title}>Configurar estação </Text>
        </View>
        <View style={styles.inputAreaLandscape}>
          <View style={styles.box}>
            {error.user ? (
              <Text style={styles.errorMensage}>{error.user}</Text>
            ) : null}
            <Text style={styles.label}>Usuário</Text>
            <TextInput
              autoCapitalize="none"
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
                placeholderTextColor={"#fff"}
                secureTextEntry={!show}
                value={password}
                onChangeText={setPassword}
                style={styles.inputSenha}
                placeholder="Senha"
                ref={passwordRef}
                onSubmitEditing={() => Keyboard.dismiss()}
              />
              <TouchableOpacity
                onPress={() => setShow(!show)}
                style={styles.buttonSenha}
              >
                <Feather
                  name={show ? "eye" : "eye-off"}
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Intervalo de atualização</Text>
            <Picker
              mode="dropdown"
              dropdownIconColor={"#fff"}
              style={styles.input}
              selectedValue={intervalGap}
              onValueChange={(itemValue, itemIndex) =>
                setIntervalGap(itemValue)
              }
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
            disabled={loading}
            onPress={() => handleSave()}
            style={styles.button}
          >
            <Text style={styles.text}>{loading ? "Salvando" : "Salvar"}</Text>
            <ActivityIndicator animating={loading} color="#fff" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
export default LoginScreen;
