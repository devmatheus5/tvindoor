import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000000",
    justifyContent: "flex-start",
  },
  inner: {
    flexDirection: "row",
    flex: 1,
  },
  video: {
    width: "80%",
    padding: 10,
  },
  videoContent: {
    height: "82.5%",
    position: "relative",
  },
  videoInfo: {
    backgroundColor: "#181818",
    height: "17.5%",
    flexDirection: "row",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  player: {
    width: "100%",
    height: "100%",
  },
  weater: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%",
    gap: 20,
    padding: 20,
  },
  weatherImg: {
    width: 50,
    height: 50,
    marginRight: 5,
  },
  cambioImg: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
  weatherCity: {
    color: "#ffffff",
    fontSize: 40,
    fontWeight: "bold",
    maxWidth: "100%",
  },
  weatherDate: {
    color: "#ffffff",
    fontSize: 20,
  },
  weatherTemp: {
    color: "#ffffff",
    fontSize: 40,
    position: "relative",
    fontWeight: "bold",
    zIndex: 1,
  },
  infoCity: {
    width: "50%",
    flexDirection: "column",
  },
  infoTemp: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "50%",
  },
  boxTemp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  grau: {
    fontSize: 14,
    textAlignVertical: "top",
    position: "absolute",
    top: 0,
  },
  logo: {
    position: "absolute",
    top: 10,
    right: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 5.46,
    elevation: 9,
    zIndex: 999,
  },
  logoImg: {
    width: 60,
    height: 54,
    resizeMode: "contain",
  },
  senhaArea: {
    backgroundColor: "#000",
    width: "20%",
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  senhaText: {
    color: "#FFF",
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },

  senha: {
    width: "100%",
    height: "17.5%",
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  senhaTitle: {
    color: "#000",
    backgroundColor: "#fff",
    fontSize: 20,
    textAlign: "center",
    width: "100%",
    padding: 10,
    borderRadius: 10,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    opacity: 0,
    position: "absolute",
  },
  alert: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 1,
  },
  background: {
    position: "absolute",
    height: "25%", // Altura do background
    bottom: 0,
    width: "100%",

    backgroundColor: "#000", // Cor do background
    opacity: 0.4,
    zIndex: 1,
    // Opacidade do background (entre 0 e 1)
  },
  newsArea: {
    width: "100%",
    height: "25%",
    position: "absolute",
    bottom: 0,
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 5.46,
    elevation: 9,
  },
  newsTitle: {
    color: "#ffffff",
    fontSize: 24,

    fontWeight: "bold",
    padding: 10,
  },
  newsTitleBox: {
    backgroundColor: "red",
    width: "100%",
    height: "40%",
  },
  newsDescription: {
    color: "#ffffff",
    fontSize: 16,
    padding: 10,
    justifyContent: "flex-start",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  newsDescriptionBox: {
    backgroundColor: "#000",
    height: "60%",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  newsFont: {
    color: "#ffffff",
    fontSize: 12,
    position: "absolute",
    bottom: 4,
    right: 4,
    zIndex: 1,
    justifyContent: "flex-start",
  },
});
