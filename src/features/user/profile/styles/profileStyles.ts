import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileCard: {
    backgroundColor: "transparent",
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#00B1E3",
    marginBottom: 16,
  },
  name: {
    marginBottom: 4,
    fontSize: 24,
  },
  email: {
    marginBottom: 4,
    fontSize: 16,
  },
  phone: {
    fontSize: 16,
    marginBottom: 16,
  },
  editButton: {
    marginTop: 16,
    width: "100%",
  },
});
