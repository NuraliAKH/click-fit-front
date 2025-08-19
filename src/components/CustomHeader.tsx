import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
  title: string;
  showBackButton?: boolean;
  onPressBack?: () => void;
  onPressFavourites?: () => void;
  onPressNotifications?: () => void;
}

const CustomHeader: React.FC<Props> = ({
  title,
  showBackButton = false,
  onPressBack,
  onPressFavourites,
  onPressNotifications,
}) => (
  <View style={styles.navbar}>
    <View style={styles.leftSection}>
      {showBackButton && (
        <TouchableOpacity
          onPress={onPressBack}
          style={styles.iconButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <MaterialCommunityIcons name="arrow-left" size={32} color="#00B1E3" />
        </TouchableOpacity>
      )}
      <Text style={styles.navbarTitle}>{title}</Text>
    </View>

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
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  navbarTitle: {
    fontSize: 24,
    color: "#00B1E3",
    fontWeight: "600",
    marginLeft: 8,
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
