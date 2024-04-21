import { ResizeMode, Video } from "expo-av";
import React, { useContext, useRef, useState } from "react";
import { Image, View } from "react-native";
import { videoUrls } from "../../../services/values";
import { playNextVideo } from "../../../utils/functions";
import styles from "../styles";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../../../hooks/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const VideoCard = () => {
  const video = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const { value } = useContext(AuthContext);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  function handleChangeMedia() {
    value.setCurrentMedia("news");
  }

  function handleNextVideo() {
    playNextVideo(
      currentVideoIndex,
      videoUrls,
      setCurrentVideoIndex,
      video,
      handleChangeMedia,
      isMuted
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
          uri: "file:///data/user/0/host.exp.exponent/files/videos/admin2.mp4",
        }}
        useNativeControls={true}
        onError={(error) => {
          console.error("Error:", error);
          handleNextVideo();
        }}
        resizeMode={ResizeMode.COVER}
        isLooping={false}
        isMuted={isMuted}
        shouldPlay={true}
        onReadyForDisplay={() => {
          video.current.playAsync();
          video.current.setIsMutedAsync(isMuted);
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
          video.current.setIsMutedAsync(!isMuted);
          setIsMuted(!isMuted);
        }}
      >
        <MaterialCommunityIcons
          name={isMuted ? "volume-off" : "volume-high"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

export default VideoCard;
