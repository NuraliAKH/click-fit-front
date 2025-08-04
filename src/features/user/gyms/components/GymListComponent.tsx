import React from "react";
import { FlatList, View, Image, TouchableOpacity, Button } from "react-native";
import { Spinner, Card, Text, Layout } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/FontAwesome";

import { useCreateFavouriteGym, useDeleteFavouriteGym, useFetchAllFavouriteGym } from "../hooks/favouriteGymHooks";

type GymImage = {
  url: string;
  isMain: boolean;
};

type Gym = {
  id: number;
  name: string;
  address: string;
  images: GymImage[];
};

type Props = {
  gyms: Gym[];
  isLoading: boolean;
};

type RootStackParamList = {
  Gyms: undefined;
  GymDetail: { gym: Gym };
  FavouritesPage: undefined; // Add this
};

const GymListComponent = ({ gyms, isLoading }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { data: favouriteGyms } = useFetchAllFavouriteGym();
  const { mutate: createFavouriteGym } = useCreateFavouriteGym();
  const { mutate: deleteFavouriteGym } = useDeleteFavouriteGym();

  const isGymFavourite = (gymId: number) => favouriteGyms?.data.some((fav: { gymId: number }) => fav.gymId === gymId);

  if (isLoading) {
    return (
      <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner size="giant" />
      </Layout>
    );
  }

  return (
    <Layout style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          padding: 12,
          backgroundColor: "#FF3D71",
          borderRadius: 8,
          margin: 16,
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("FavouritesPage")}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>❤️ Favourites</Text>
      </TouchableOpacity>

      <FlatList
        data={gyms}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => {
          const mainImage = item.images.find(img => img.isMain)?.url;
          const imageUrl = mainImage || "https://via.placeholder.com/100";
          const isFavourite = isGymFavourite(item.id);

          const handleToggleFavourite = () => {
            if (isFavourite) {
              deleteFavouriteGym(item.id);
            } else {
              createFavouriteGym({ gymId: item.id });
            }
          };

          return (
            <Card style={{ marginBottom: 16 }} onPress={() => navigation.navigate("GymDetail", { gym: item })}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: imageUrl }}
                  style={{ width: 100, height: 100, borderRadius: 8, marginRight: 16 }}
                />
                <View style={{ flex: 1 }}>
                  <Text category="h6">{item.name}</Text>
                  <Text appearance="hint" category="s2">
                    {item.address}
                  </Text>
                </View>
                <TouchableOpacity onPress={handleToggleFavourite} style={{ padding: 8 }}>
                  <Icon name="heart" size={24} color={isFavourite ? "#FF3D71" : "#ccc"} />
                </TouchableOpacity>
              </View>
            </Card>
          );
        }}
      />
    </Layout>
  );
};

export default GymListComponent;
