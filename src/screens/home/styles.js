import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000000",
    padding: 20,
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 20,
    padding: 10,
  },
  button: {
    backgroundColor: "#808184",
    padding: 10,
    borderRadius: 5,
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "nowrap",
  },
  text: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "500",
  },
});
