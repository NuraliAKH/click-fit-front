import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface GymCardsListProps {
  title: string;
  children: React.ReactNode;
}

const GymCardsList: React.FC<GymCardsListProps> = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.seeMore}>see more </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  seeMore: {
    fontSize: 14,
    color: "#00B1E3",
  },
  scrollContainer: {
    paddingHorizontal: 12,
    gap: 12,
  },
});

export default GymCardsList;
