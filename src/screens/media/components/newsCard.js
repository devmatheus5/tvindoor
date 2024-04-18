import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { View, Text, Image, Animated, ScrollView } from "react-native";
import useInfo from "../../../hooks/useInfo";
import styles from "../styles";
import { AuthContext } from "../../../hooks/auth";
const NewsCard = () => {
  const currentNewsIndexRef = useRef(currentNewsIndex);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const { value } = useContext(AuthContext);
  const { news } = useInfo();

  useEffect(() => {
    currentNewsIndexRef.current = currentNewsIndex;
  }, [currentNewsIndex]);

  const handleNews = useCallback(() => {
    if (currentNewsIndex == news.length - 1) {
      setCurrentNewsIndex(0);
      value.setCurrentMedia("video");
    } else {
      setCurrentNewsIndex(currentNewsIndex + 1);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(handleNews, 15000);
    return () => clearInterval(interval);
  }, [handleNews]);

  const translateXAnimation = useRef(new Animated.Value(0)).current;
  const startAnimation = () => {
    Animated.loop(
      Animated.timing(translateXAnimation, {
        toValue: -500,
        duration: 15000,
        useNativeDriver: true,
      })
    ).start();
  };
  useEffect(() => {
    startAnimation();
  }, [translateXAnimation]);

  const renderNewsContent = (currentNews) => (
    <>
      <Image
        source={{ uri: currentNews.image_url }}
        style={styles.newsBanner}
      />
      <Image
        source={{ uri: currentNews.source_icon }}
        style={styles.sourceIcon}
      />
      <View style={styles.newsArea}>
        <Text style={styles.sourceUrl}>{currentNews.source_url}</Text>
        <View style={styles.newsTitleBox}>
          <Text numberOfLines={1} style={styles.newsTitle}>
            {currentNews.title}
          </Text>
        </View>
        <ScrollView horizontal style={styles.newsDescriptionBox}>
          <Animated.Text
            style={[
              styles.newsDescription,
              { transform: [{ translateX: translateXAnimation }] },
            ]}
          >
            {currentNews.description}
          </Animated.Text>
        </ScrollView>
      </View>
    </>
  );

  const renderDefaultContent = () => (
    <Image
      source={require("../../../../assets/thumb.png")}
      style={styles.newst}
    />
  );

  return (
    <View style={styles.videoContent}>
      {news && news[currentNewsIndex]?.image_url
        ? renderNewsContent(news[currentNewsIndex])
        : renderDefaultContent()}
    </View>
  );
};

export default NewsCard;
