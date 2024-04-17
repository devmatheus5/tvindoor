import {
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import React, { useContext, useEffect, useState } from "react";
import SenhasComponent from "./components/senhas";
import NewsCard from "./components/newsCard";
import VideosCard from "./components/videosCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import VtCard from "./components/vt";
import OverlayNew from "./components/overlayNew";
import { Senhas } from "../../services/values";
import { AuthContext } from "../../hooks/auth";
import { Audio } from "expo-av";
function MediaScreen() {
  const inputRef = React.useRef(null);
  const [show, setShow] = React.useState(false);
  const [formInput, setFormInput] = React.useState("");
  const [newBalcao, setNewBalcao] = React.useState();
  const [isOpened, setIsOpened] = React.useState(false);
  const { value } = useContext(AuthContext);

  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/alert.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handleNewBalcao = () => {
    if (formInput === "") {
      return;
    }
    const data = {
      value: parseInt(formInput),
      type: "balcao",
      data: new Date().toISOString(),
      status: "pendente",
    };
    setNewBalcao(data);
    setIsOpened(true);
    playSound();
    setTimeout(() => {
      setIsOpened(false);
    }, 5000);

    Senhas.push(data);
    setFormInput("");
  };
  const focusInput = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    const keys = inputRef.current;
    if (!keys) {
      return;
    }
    focusInput();
  }, [inputRef.current]);

  return (
    <KeyboardAvoidingView style={styles.body} behavior="padding">
      <View style={styles.container}>
        <View style={styles.inner}>
          <View style={styles.video}>
            {value.user?.hnews && <NewsCard />}

            {!value?.user?.hnews && <VideosCard />}
            <TouchableOpacity
              onPress={() => setShow(!show)}
              style={styles.logo}
            >
              <Image
                style={styles.logoImg}
                source={require("../../../assets/logo.png")}
              />
            </TouchableOpacity>

            {show && (
              <View style={styles.menu}>
                <TouchableOpacity
                  onPress={() => {
                    value.setUser({
                      ...value.user,
                      hnews: true,
                    }),
                      setShow(!show);
                  }}
                  style={styles.menuItem}
                >
                  <MaterialCommunityIcons
                    name="newspaper-variant-outline"
                    size={18}
                    color="black"
                  />

                  <Text
                    style={[
                      styles.menuText,
                      {
                        borderBottomColor: value.user.hnews ? "#000" : "#fff",
                        borderBottomWidth: value.user.hnews ? 1 : 0,
                      },
                    ]}
                  >
                    Notícias
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    value.setUser({
                      ...value.user,
                      hnews: false,
                    }),
                      setShow(!show);
                  }}
                  style={styles.menuItem}
                >
                  <MaterialCommunityIcons
                    name="motion-play-outline"
                    size={18}
                    color="black"
                  />
                  <Text
                    style={[
                      styles.menuText,
                      {
                        borderBottomColor: !value.user.hnews ? "#000" : "#fff",
                        borderBottomWidth: !value.user.hnews ? 1 : 0,
                      },
                    ]}
                  >
                    Vídeos
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => value.logout()}
                  style={styles.menuItem}
                >
                  <MaterialCommunityIcons
                    name="logout-variant"
                    size={18}
                    color="black"
                  />
                  <Text style={styles.menuText}>Sair</Text>
                </TouchableOpacity>
              </View>
            )}

            <VtCard />
          </View>
          <SenhasComponent
            Senhas={Senhas}
            inputRef={inputRef}
            focusInput={focusInput}
          />
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Digite o número da senha"
            showSoftInputOnFocus={true}
            value={formInput}
            onChangeText={setFormInput}
            returnKeyType="done"
            onSubmitEditing={() => handleNewBalcao()}
            onBlur={() => {
              focusInput();
            }}
          />
        </View>
        {isOpened && <OverlayNew newBalcao={newBalcao} />}
      </View>
    </KeyboardAvoidingView>
  );
}
export default React.memo(MediaScreen);
