import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../styles";
import useVideo from "../../../hooks/useVideo";
export default function LoadingOverlay() {
  const { isError, getVideos } = useVideo();
  const handleReload = () => {
    getVideos();
  };
  return (
    <View style={styles.loading}>
      <Image
        source={require("../../../../assets/logo.png")}
        style={styles.loadingLogo}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          marginBottom: 20,
        }}
      >
        <Text style={styles.loadingText}>
          {isError == true
            ? "Verifique sua conexão com a internet"
            : "  Configurando estação, aguarde no aplicativo"}
        </Text>
        {isError == true ? (
          <MaterialCommunityIcons
            name="access-point-network-off"
            size={24}
            color="red"
          />
        ) : (
          <ActivityIndicator size="small" color="white" />
        )}
      </View>

      {isError == true && (
        <TouchableOpacity style={styles.refresh} onPress={() => handleReload()}>
          <Text style={styles.refreshText}>Tentar novamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
