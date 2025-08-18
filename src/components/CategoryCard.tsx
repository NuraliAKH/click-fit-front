import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

type CategoryCardProps = {
  title?: string;
  subtitle?: string;
  image: string;
  onPress?: () => void;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ title, subtitle, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={2}>
            {subtitle}
          </Text>
        )}
        {title && <Text style={styles.title}>{title}</Text>}
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
    width: 150,
    overflow: "hidden",
    marginVertical: 8,
    elevation: 4,
  },
  image: {
    alignSelf: "center",
    marginTop: 10,
    width: 80,
    height: 80,
    resizeMode: "cover",
    color: "#00B1E3",
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

export default CategoryCard;
