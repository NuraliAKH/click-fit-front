// components/GymCard.tsx
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

type GymCardProps = {
  title: string;
  subtitle: string;
  image: string;
  onPress?: () => void;
};

const GymCard: React.FC<GymCardProps> = ({ title, subtitle, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.subtitle} numberOfLines={2}>
          {subtitle}
        </Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderColor: "#00B1E3",
    borderWidth: 1,
    backgroundColor: "transparent",
    width: 260,
    overflow: "hidden",
    marginVertical: 8,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  content: {
    padding: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    color: "#fff",
  },
});

export default GymCard;
