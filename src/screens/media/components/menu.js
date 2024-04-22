import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Menu({ value, show, setShow }) {
  return (
    <>
      <TouchableOpacity onPress={() => setShow(!show)} style={styles.logo}>
        <Image
          style={styles.logoImg}
          source={require("../../../../assets/logo.png")}
        />
      </TouchableOpacity>
      {show && (
        <View style={styles.menu}>
          {value?.user?.news == 1 && (
            <TouchableOpacity
              onPress={() => {
                value.setCurrentMedia("news");
                setShow(!show);
              }}
              style={styles.menuItem}
            >
              <MaterialCommunityIcons
                name="newspaper-variant-outline"
                size={18}
                color="black"
              />

              <Text
                style={[
                  styles.menuText,
                  {
                    borderBottomColor:
                      value.currentMedia == "news" ? "#000" : "#fff",
                    borderBottomWidth: value.currentMedia == "news" ? 1 : 0,
                  },
                ]}
              >
                Notícias
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => {
              value.setCurrentMedia("video");
              setShow(!show);
            }}
            style={styles.menuItem}
          >
            <MaterialCommunityIcons
              name="motion-play-outline"
              size={18}
              color="black"
            />
            <Text
              style={[
                styles.menuText,
                {
                  borderBottomColor:
                    value.currentMedia == "video" ? "#000" : "#fff",
                  borderBottomWidth: value.currentMedia == "video" ? 1 : 0,
                },
              ]}
            >
              Vídeos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => value.logout()}
            style={styles.menuItem}
          >
            <MaterialCommunityIcons
              name="logout-variant"
              size={18}
              color="black"
            />
            <Text style={styles.menuText}>Sair</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
