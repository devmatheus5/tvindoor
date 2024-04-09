import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "./styles";
import { Senhas, videoUrls } from "../../services/values";
import {
  formattedDate,
  getImage,
  handleType,
  playNextVideo,
} from "../../utils/functions";
import { Video, ResizeMode } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import useInfo from "../../hooks/useInfo";
import SenhasComponent from "./components/senhas";
function MediaScreen() {
  const inputRef = useRef(null);
  const video = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const { dollar, weather, news } = useInfo();
  const [balcaoNew, setBalcaoNew] = useState("");
  const [put, setPut] = useState(false);
  const fucusInput = () => {
    inputRef.current.focus();
  };
  useEffect(() => {
    const keys = inputRef.current;
    if (!keys) {
      return;
    }
    fucusInput();
  }, [inputRef.current]);

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.video}>
          <View style={styles.videoContent}>
            {/* <Video
              usePoster={true}
              PosterComponent={Image}
              posterSource={require("../../../assets/thumb.jpg")}
              ref={video}
              style={styles.player}
              source={{ uri: videoUrls[currentVideoIndex] }}
              useNativeControls={false}
              onError={(error) => {
                playNextVideo(
                  currentVideoIndex,
                  videoUrls,
                  setCurrentVideoIndex,
                  video
                );
              }}
              resizeMode={ResizeMode.COVER}
              isLooping={false}
              shouldPlay={true}
              onPlaybackStatusUpdate={(status) => {
                if (status.didJustFinish) {
                  playNextVideo(
                    currentVideoIndex,
                    videoUrls,
                    setCurrentVideoIndex,
                    video
                  );
                }
              }}
            />*/}

            <Image source={{ uri: news[0]?.image_url }} style={styles.player} />
            <Image
              source={{ uri: news[0]?.source_icon }}
              style={{
                position: "absolute",
                width: 50,
                height: 50,
                top: 10,
                left: 10,
                zIndex: 999,
                borderRadius: 50,
              }}
            />

            <View style={styles.newsArea}>
              <Text style={styles.newsFont}>{news[0]?.source_url}</Text>
              <View style={styles.newsTitleBox}>
                <Text style={styles.newsTitle}>{news[0]?.title}</Text>
              </View>
              <View style={styles.newsDescriptionBox}>
                <Text ellipsizeMode="tail" style={styles.newsDescription}>
                  {news[0]?.description}
                </Text>
              </View>
            </View>

            <View style={styles.logo}>
              <Image
                style={styles.logoImg}
                source={require("../../../assets/logo.png")}
              />
            </View>
          </View>

          <View style={styles.videoInfo}>
            <View style={styles.weater}>
              <View style={styles.infoCity}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.weatherCity}
                >
                  {weather.city}
                </Text>
                <Text style={styles.weatherDate}>{formattedDate()}</Text>
              </View>
              <View style={styles.infoTemp}>
                <View style={styles.boxTemp}>
                  <Image
                    source={getImage(weather.condition_slug)}
                    style={styles.weatherImg}
                  />

                  <Text style={styles.weatherTemp}>
                    {weather.temp}
                    <Text style={styles.grau}>°C</Text>
                  </Text>
                </View>

                <Text style={styles.weatherDate}>{weather.description}</Text>
              </View>
              <View style={styles.infoTemp}>
                <View style={styles.boxTemp}>
                  <Image
                    style={styles.cambioImg}
                    source={require("../../../assets/risk.png")}
                  />
                  <Text style={styles.weatherTemp}>
                    {dollar}
                    <Text style={styles.grau}>R$</Text>
                  </Text>
                </View>

                <Text style={styles.weatherDate}>Dolar comercial</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.senhaArea}>
          {put && (
            <Ionicons style={styles.alert} name="alert" size={24} color="red" />
          )}
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Digite o número da senha"
            keyboardType="numeric"
            value={balcaoNew}
            onChangeText={setBalcaoNew}
            onSubmitEditing={() => {
              if (balcaoNew) {
                Senhas.push({
                  value: parseInt(balcaoNew),
                  type: "balcao",
                  data: new Date().toISOString(),
                  status: "pendente",
                });
                setBalcaoNew("");
              } else {
                Alert.alert("Erro", "Digite um número válido!");
                inputRef.current.focus();
              }
            }}
            onBlur={() => fucusInput()}
          />
          <SenhasComponent />
        </View>
      </View>
    </View>
  );
}
export default React.memo(MediaScreen);
