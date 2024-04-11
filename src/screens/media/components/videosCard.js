import { ResizeMode, Video } from "expo-av";
import React, { useRef, useState } from "react";
import { Image, View } from "react-native";
import { videoUrls } from "../../../services/values";
import { playNextVideo } from "../../../utils/functions";
import styles from "../styles";
const VideoCard = () => {
  const video = useRef(null);
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
      />
      <View style={styles.logo}>
        <Image
          style={styles.logoImg}
          source={require("../../../../assets/logo.png")}
        />
      </View>
    </View>
  );
};

export default React.memo(VideoCard, (prevProps, nextProps) => {
  return prevProps.videoUrls === nextProps.videoUrls;
});
