import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  useCreateFavouriteGym,
  useDeleteFavouriteGym,
  useFetchAllFavouriteGym,
} from "../features/user/gyms/hooks/favouriteGymHooks";

type GymCardProps = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  onPress?: () => void;
};

const GymCard: React.FC<GymCardProps> = ({ id, title, subtitle, image, onPress }) => {
  const { data: favouriteGyms } = useFetchAllFavouriteGym();
  const { mutate: createFavouriteGym } = useCreateFavouriteGym();
  const { mutate: deleteFavouriteGym } = useDeleteFavouriteGym();

  const isGymFavourite = favouriteGyms?.data.some((fav: { gymId: number }) => fav.gymId === id);

  const toggleFavourite = () => {
    if (isGymFavourite) {
      deleteFavouriteGym(id);
    } else {
      createFavouriteGym({ gymId: id });
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View>
        <Image source={{ uri: image }} style={styles.image} />
        <TouchableOpacity style={styles.likeBtn} onPress={toggleFavourite} activeOpacity={0.7}>
          <Ionicons
            name={isGymFavourite ? "heart" : "heart-outline"}
            size={24}
            color={isGymFavourite ? "red" : "#fff"}
          />
        </TouchableOpacity>
      </View>

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
  likeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    padding: 6,
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
