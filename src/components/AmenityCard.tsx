import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

type CategoryCardProps = {
  title: string;
  image: string;
  onPress?: () => void;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image, onPress }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={styles.card}
    >
      <Image source={{ uri: image }} style={styles.image} />
      {hovered && (
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#00B1E3",
    backgroundColor: "transparent",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 177, 227, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CategoryCard;
