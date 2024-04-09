import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000000",
    padding: 20,
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  inputAreaPortrait: {
    width: "85%",
    padding: 20,
  },
  inputAreaLandscape: {
    width: "60%",
    padding: 20,
  },
  box: {
    marginBottom: 10,
    position: "relative",
  },
  boxSenha: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  label: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#454545",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    marginBottom: 10,
    fontSize: 20,
    color: "#fff",
  },
  inputSenha: {
    backgroundColor: "#454545",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    fontSize: 20,
    marginBottom: 10,
    color: "#fff",
  },
  buttonSenha: {
    right: 10,
    position: "absolute",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    bottom: 21,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#808184",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "nowrap",
    flexDirection: "row",
    gap: 10,
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "500",
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "500",
  },
  errorMensage: {
    color: "red",
    fontSize: 14,
    position: "absolute",
    top: 0,
    right: 0,
  },
});
