import { StyleSheet } from "react-native";

export default StyleSheet.create({
  body: {
    flex: 1,
  },
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
    width: "85%",
    marginTop: 10,
  },
  videoContent: {
    height: "82.5%",
  },
  videoInfo: {
    backgroundColor: "#000",
    height: "17.5%",
    flexDirection: "row",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
  },
  playerVideo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  newsBanner: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    opacity: 0.8,
  },
  poster: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    opacity: 1,
  },
  playert: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  newst: {
    width: "75%",
    height: "75%",
    alignSelf: "center",
    marginTop: "7.5%",
  },
  weater: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    gap: 20,
    padding: 20,
  },
  weatherImg: {
    width: 40,
    height: 40,
    marginRight: 0,
  },
  cambioImg: {
    width: 35,
    height: 35,
    marginRight: 5,
  },
  weatherCity: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "500",
    maxWidth: "100%",
  },
  weatherDate: {
    color: "#ffffff",
    fontSize: 16,
  },
  weatherTemp: {
    color: "#ffffff",
    fontSize: 30,
    position: "relative",
    fontWeight: "500",
    zIndex: 1,
  },
  infoCity: {
    flexDirection: "column",
  },
  infoTemp: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  boxTemp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sourceUrl: {
    position: "absolute",
    bottom: 2,
    right: 2,
    color: "red",
    zIndex: 999999,
    fontSize: 10,
  },
  grau: {
    fontSize: 14,
    textAlignVertical: "top",
    position: "absolute",
    top: 0,
    fontWeight: "500",
  },
  logo: {
    position: "absolute",
    top: 10,
    right: 10,

    zIndex: 999,
  },

  logoImg: {
    width: 70,
    height: 46,
    resizeMode: "cover",
  },
  senhaArea: {
    backgroundColor: "#000",
    width: "15%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
  menu: {
    backgroundColor: "#fff",
    position: "absolute",
    top: 56,

    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.8,
    shadowRadius: 11.14,
    elevation: 17,
    zIndex: 999,

    right: 0,
    height: "20%",
  },
  menuItem: {
    padding: 5,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  menuText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
    textAlign: "left",
  },
  senhaText: {
    color: "#FFF",
    fontSize: 45,
    fontWeight: "bold",
    marginTop: 18,
    textAlign: "center",
  },

  senha: {
    width: "100%",
    borderRadius: 10,
    marginBottom: 15,
    borderRadius: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    opacity: 0.85,
    paddingVertical: 10,
  },
  senhaTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "left",
    width: "100%",
    marginBottom: 10,
  },
  input: {
    width: "1%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    opacity: 0,
    position: "absolute",
  },

  background: {
    position: "absolute",
    height: "17%", // Altura do background
    bottom: 0,
    width: "100%",
    backgroundColor: "#000", // Cor do background
    opacity: 0.1,
    zIndex: 999999,
  },
  newsArea: {
    width: "100%",
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
    fontSize: 20,
    fontWeight: "500",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  newsTitleBox: {
    backgroundColor: "red",
    width: "100%",
    opacity: 0.8,
  },
  newsDescription: {
    color: "#ffffff",
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "flex-start",
    marginBottom: 15,
  },
  newsDescriptionBox: {
    backgroundColor: "#000",
    opacity: 0.8,
    width: "100%",
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
  sourceIcon: {
    position: "absolute",
    top: 10,
    borderRadius: 50,
    left: 20,
    width: 40,
    height: 40,
    zIndex: 99999,
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,1)",
    zIndex: 9999999999,
  },
  balcaonew: {
    width: "100%",
    height: "75%",
    top: "12.5%",
    bottom: "12.5%",
    backgroundColor: "#000",
    position: "absolute",
    zIndex: 9999999999,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  balcaonewtext: {
    color: "#ffffff",
    fontSize: 250,
    fontWeight: "700",
  },
  balcaonewlabel: {
    color: "#ffffff",
    fontSize: 50,
    fontWeight: "700",
  },
  lastSenha: {
    width: "100%",
    height: "15.5%",
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  divider: {
    width: "95%",
    opacity: 0.8,
    height: 2,
    backgroundColor: "#fff",
  },

  lastSenhaText: {
    color: "#FFF",
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
  lastweatherDate: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "500",
    opacity: 0.7,
    textAlign: "center",
  },
  senhaHeader: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#121212",
  },
  outrasSenhas: {
    width: "100%",
    flexDirection: "column",
  },
  outrasSenhasTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  senhaFooter: {
    gap: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 6,
  },
  muteButton: {
    position: "absolute",
    top: 10,
    left: 15,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    zIndex: 9999999999999,
    opacity: 0.8,
  },
  senhaMuteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    padding: 10,
    borderRadius: 50,
    zIndex: 9999999999999,
    opacity: 0.8,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "#000",
    width: "100%",
    height: "100%",
    zIndex: 9999999999,
  },
  loadingText: {
    color: "#fff",
    fontSize: 20,
    marginRight: 10,
  },
  loadingBar: {
    width: 400,
    height: 6,
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 20,
  },
  loadingLogo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  refresh: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  refreshText: {
    color: "#000",
  },
});
