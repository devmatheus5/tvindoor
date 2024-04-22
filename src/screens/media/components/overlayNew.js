import React, { useEffect, useRef } from "react";
import { Text, View, Animated, Easing } from "react-native";
import styles from "../styles";

export default function OverlayNew({ newBalcao }) {
  const opacityAnimation = useRef(new Animated.Value(0.6)).current;
  const scaleAnimation = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const sequence = Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnimation, {
        toValue: 0.6,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      // ...
      Animated.timing(scaleAnimation, {
        toValue: 0.8,
        duration: 500,
        easing: Easing.out(Easing.ease),
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
