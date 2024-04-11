import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import useInfo from "../../../hooks/useInfo";
import styles from "../styles";
import { AuthContext } from "../../../hooks/auth";
import { TouchableOpacity } from "react-native";
const NewsCard = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const { value } = useContext(AuthContext);
  const { news } = useInfo();
  const handleNews = useCallback(() => {
    setCurrentNewsIndex(
      currentNewsIndex == news.length - 1 ? 0 : currentNewsIndex + 1
    );
  }, [currentNewsIndex]);

  useEffect(() => {
    const interval = setInterval(handleNews, 30000);
    return () => clearInterval(interval);
  }, [handleNews]);
  return (
    <View style={styles.videoContent}>
      {news && news[currentNewsIndex]?.image_url ? (
        <>
          <Image
            source={{ uri: news[currentNewsIndex]?.image_url }}
            style={styles.newsBanner}
          />
          <Image
            source={{ uri: news[currentNewsIndex]?.source_icon }}
            style={styles.sourceIcon}
          />

          <View style={styles.newsArea}>
            <Text style={styles.sourceUrl}>
              {news[currentNewsIndex]?.source_url}
            </Text>
            <View style={styles.newsTitleBox}>
              <Text numberOfLines={1} style={styles.newsTitle}>
                {news[currentNewsIndex]?.title}
              </Text>
            </View>
            <View style={styles.newsDescriptionBox}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.newsDescription}
              >
                {news[currentNewsIndex]?.description}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() =>
              value?.setUser({
                ...value?.user,
                hnews: !value?.user?.hnews,
              })
            }
            style={styles.logo}
          >
            <Image
              style={styles.logoImg}
              source={require("../../../../assets/logo.png")}
            />
          </TouchableOpacity>
        </>
      ) : (
        <Image
          source={require("../../../../assets/thumb.png")}
          style={styles.playert}
        />
      )}
    </View>
  );
};

export default NewsCard;
