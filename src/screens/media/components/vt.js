import React from "react";
import { View, Text, Image } from "react-native";
import styles from "../styles";
import { formattedDate, getImage } from "../../../utils/functions";
import useInfo from "../../../hooks/useInfo";

const VtCard = () => {
  const { dollar, weather } = useInfo();
  return (
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
              source={require("../../../../assets/risk.png")}
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
  );
};
export default React.memo(VtCard, (prevProps, nextProps) => {
  return (
    prevProps.weather === nextProps.weather &&
    prevProps.dollar === nextProps.dollar
  );
});
