import React, { useEffect, useRef } from "react";
import { Text, View, Animated } from "react-native";
import styles from "../styles";

export default function OverlayNew({ newBalcao }) {
  const opacityAnimation = useRef(new Animated.Value(0.4)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const sequence = Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 1.2,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnimation, {
        toValue: 0.6,
        duration: 300,
        useNativeDriver: true,
      }),

      Animated.timing(opacityAnimation, {
        toValue: 0.8,
        duration: 300,
        useNativeDriver: true,
      }),

      Animated.timing(opacityAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),

      Animated.timing(opacityAnimation, {
        toValue: 0.8,
        duration: 300,
        useNativeDriver: true,
      }),

      Animated.timing(opacityAnimation, {
        toValue: 0.6,
        duration: 300,
        useNativeDriver: true,
      }),

      Animated.timing(opacityAnimation, {
        toValue: 0.4,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]);

    const loop = Animated.loop(sequence);
    loop.start();

    return () => loop.stop();
  }, [opacityAnimation]);
  return (
    <>
      <View style={styles.overlay} />
      <Animated.View
        style={[
          styles.balcaonew,
          {
            opacity: opacityAnimation,
            transform: [{ scale: scaleAnimation }],
          },
        ]}
      >
        <Text style={styles.balcaonewlabel}>SENHA</Text>
        <Text style={styles.balcaonewtext}>{newBalcao?.value || "00"}</Text>
      </Animated.View>
    </>
  );
}
