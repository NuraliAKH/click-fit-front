import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
  title: string;
  onPressFavourites?: () => void;
  onPressNotifications?: () => void;
}

const CustomHeader: React.FC<Props> = ({ title, onPressFavourites, onPressNotifications }) => (
  <View style={styles.navbar}>
    <Text style={styles.navbarTitle}>{title}</Text>

    <View style={styles.rightIcons}>
      <TouchableOpacity onPress={onPressFavourites} style={styles.iconButton}>
        <MaterialCommunityIcons name="heart-outline" size={32} color="#00B1E3" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressNotifications} style={styles.iconButton}>
        <MaterialCommunityIcons name="bell-outline" size={32} color="#00B1E3" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  navbarTitle: {
    fontSize: 24,
    color: "#00B1E3",
    fontWeight: "600",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 15,
  },
});

export default CustomHeader;
