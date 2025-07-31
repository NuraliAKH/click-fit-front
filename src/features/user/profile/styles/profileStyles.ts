import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileCard: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    marginBottom: 4,
  },
  email: {
    marginBottom: 4,
  },
  phone: {
    marginBottom: 16,
  },
  editButton: {
    marginTop: 16,
    width: "100%",
  },
});
