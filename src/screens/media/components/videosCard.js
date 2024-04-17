import { ResizeMode, Video } from "expo-av";
import React, { useContext, useRef, useState } from "react";
import { Image, View } from "react-native";
import { videoUrls } from "../../../services/values";
import { playNextVideo } from "../../../utils/functions";
import styles from "../styles";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../../../hooks/auth";
const VideoCard = () => {
  const video = useRef(null);
  const { value } = useContext(AuthContext);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  return (
    <View style={styles.videoContent}>
      <Video
        usePoster={true}
        PosterComponent={Image}
        posterStyle={styles.poster}
        posterSource={require("../../../../assets/thumb.png")}
        ref={video}
        style={styles.playerVideo}
        source={{ uri: videoUrls[currentVideoIndex] }}
        useNativeControls={true}
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
        onReadyForDisplay={() => {
          video.current.playAsync();
        }}
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
      />
    </View>
  );
};

export default VideoCard;
