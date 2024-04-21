import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useTVEventHandler,
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

    await sound.playAsync();
  }

  useEffect(() => {
    if (!sound) return;

    return () => {
      sound.unloadAsync();
    };
  }, [sound]);

  const handleNewBalcao = () => {
    if (formInput == "") {
      return;
    }

    const data = {
      value: parseInt(formInput),
      type: "balcao",
      data: new Date().toISOString(),
      status: "pendente",
    };
    if (isNaN(data.value) || data.value < 0) {
      inputRef.current.clear();
      return;
    }
    Senhas.unshift(data);
    setFormInput("");

    setNewBalcao(data);
    setIsOpened(true);
    playSound();

    const closeAfterTimeout = () => setIsOpened(false);
    setTimeout(closeAfterTimeout, 5000);
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

  const handleEnter = () => {
    if (inputRef.current.isFocused()) {
      handleNewBalcao();
    }
  };
  const myEventHandler = (evt) => {
    if (evt.eventType === "select" && evt.eventKeyAction == 1) {
      handleEnter();
    }
  };
  useTVEventHandler(myEventHandler);

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.video}>
          {value?.currentMedia == "news" && <NewsCard />}

          {value?.currentMedia == "video" && <VideosCard />}
          <TouchableOpacity onPress={() => setShow(!show)} style={styles.logo}>
            <Image
              style={styles.logoImg}
              source={require("../../../assets/logo.png")}
            />
          </TouchableOpacity>

          {show && (
            <View style={styles.menu}>
              {value?.user?.hnews == true && (
                <TouchableOpacity
                  onPress={() => {
                    value.setCurrentMedia("news");
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
                        borderBottomColor:
                          value.currentMedia == "news" ? "#000" : "#fff",
                        borderBottomWidth: value.currentMedia == "news" ? 1 : 0,
                      },
                    ]}
                  >
                    Notícias
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => {
                  value.setCurrentMedia("video");
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
                      borderBottomColor:
                        value.currentMedia == "video" ? "#000" : "#fff",
                      borderBottomWidth: value.currentMedia == "video" ? 1 : 0,
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
        <SenhasComponent Senhas={Senhas} />

        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Digite o número da senha"
          showSoftInputOnFocus={false}
          value={formInput}
          onChangeText={setFormInput}
          clearTextOnFocus={true}
          onBlur={() => {
            focusInput();
          }}
        />
      </View>
      {isOpened && <OverlayNew newBalcao={newBalcao} />}
    </View>
  );
}
export default React.memo(MediaScreen);
