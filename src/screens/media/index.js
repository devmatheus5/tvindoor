import {
  Image,
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
import { focusInput, handleEnter, playSound } from "../../utils/functions";
import Menu from "./components/menu";
import SenhaInput from "./components/SenhaInput";
import useVideo from "../../hooks/useVideo";
function MediaScreen() {
  const inputRef = React.useRef(null);
  const [show, setShow] = React.useState(false);
  const [formInput, setFormInput] = React.useState("");
  const [newBalcao, setNewBalcao] = React.useState();
  const [isOpened, setIsOpened] = React.useState(false);
  const { value } = useContext(AuthContext);
  const [sound, setSound] = useState();
  const [isMuted, setIsMuted] = useState(false);
  const { videoUrls } = useVideo();
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
    if (!isMuted) {
      playSound(setSound);
    }
    const closeAfterTimeout = () => setIsOpened(false);
    setTimeout(closeAfterTimeout, 5000);
  };

  useEffect(() => {
    const keys = inputRef.current;
    if (!keys) {
      return;
    }
    focusInput(inputRef);
  }, [inputRef.current]);

  const myEventHandler = (evt) => {
    if (evt.eventType === "select" && evt.eventKeyAction == 1) {
      handleEnter(inputRef, handleNewBalcao);
    }
  };
  useTVEventHandler(myEventHandler);
  const handleIsMuted = async () => {
    setIsMuted(!isMuted);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.video}>
          {value?.currentMedia == "news" && <NewsCard />}
          {value?.currentMedia == "video" && <VideosCard />}
          <Menu value={value} show={show} setShow={setShow} />
          <VtCard />
        </View>
        <SenhasComponent
          Senhas={Senhas}
          isMuted={isMuted}
          handleIsMuted={handleIsMuted}
        />
        <SenhaInput
          inputRef={inputRef}
          formInput={formInput}
          setFormInput={setFormInput}
        />
      </View>
      {isOpened && <OverlayNew newBalcao={newBalcao} />}
    </View>
  );
}
export default React.memo(MediaScreen);
