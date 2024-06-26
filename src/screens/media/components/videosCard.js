import { ResizeMode, Video } from "expo-av";
import React, { useContext, useRef, useState } from "react";
import { Image, View } from "react-native";
import { playNextVideo } from "../../../utils/functions";
import styles from "../styles";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../../../hooks/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useVideo from "../../../hooks/useVideo";
const VideoCard = () => {
  const video = useRef(null);
  const { videoUrls } = useVideo();
  const { value } = useContext(AuthContext);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  function handleChangeMedia() {
    if (value.user.news == 1) {
      value.setCurrentMedia("news");
    } else {
      handleNextVideo();
    }
  }

  function handleNextVideo() {
    playNextVideo(
      currentVideoIndex,
      videoUrls,
      setCurrentVideoIndex,
      video,
      handleChangeMedia,
      value.isMuted
    );
  }
  return (
    <View style={styles.videoContent}>
      <Video
        usePoster={true}
        PosterComponent={Image}
        posterStyle={styles.playert}
        posterSource={require("../../../../assets/thumb.png")}
        ref={video}
        style={styles.playerVideo}
        source={{
          uri: videoUrls[currentVideoIndex],
        }}
        useNativeControls={true}
        onError={(error) => {
          console.error("ErrorVideo:", videoUrls[currentVideoIndex], error);
          handleNextVideo();
        }}
        resizeMode={ResizeMode.COVER}
        isLooping={false}
        isMuted={value.isMuted}
        shouldPlay={true}
        onReadyForDisplay={() => {
          video.current.playAsync();
          video.current.setIsMutedAsync(value.isMuted);
        }}
        onPlaybackStatusUpdate={(status) => {
          if (status.didJustFinish) {
            handleNextVideo();
          }
        }}
      />
      <TouchableOpacity
        style={styles.muteButton}
        onPress={() => {
          video.current.setIsMutedAsync(!value.isMuted);
          value.handleIsMuted();
        }}
      >
        <MaterialCommunityIcons
          name={value.isMuted ? "volume-off" : "volume-high"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

export default VideoCard;
