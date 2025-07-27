import React from "react";
import { View, StyleSheet } from "react-native";
import { AmenityList } from "../components/AmenityList";

export const AmenitySettingsPage = () => {
  return (
    <View style={styles.container}>
      <AmenityList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
