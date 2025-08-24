import React from "react";
import { FlatList, View, Image, TouchableOpacity } from "react-native";
import { Layout, Text, Card, Spinner } from "@ui-kitten/components";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useDeleteFavouriteGym, useFetchAllFavouriteGym } from "../hooks/favouriteGymHooks";
import CustomHeader from "../../../../components/CustomHeader";

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

type RootStackParamList = {
  GymDetail: { gym: Gym };
};

const FavouritesPage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data: favouriteGymsResponse, isLoading } = useFetchAllFavouriteGym();

  const favouriteGyms = favouriteGymsResponse?.data ?? [];
  const { mutate: deleteFavouriteGym, isPending: isDeleting } = useDeleteFavouriteGym();

  const handleRemoveFavourite = (gymId: number) => {
    deleteFavouriteGym(gymId);
  };

  if (isLoading) {
    return (
      <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner size="giant" />
      </Layout>
    );
  }

  return (
    <Layout style={{ flex: 1, padding: 16, backgroundColor: "transparent" }}>
      <CustomHeader title="Favourite Gyms" />
      {favouriteGyms.length === 0 ? (
        <Text category="h6" style={{ textAlign: "center", marginTop: 32 }}>
          У вас нет избранных залов
        </Text>
      ) : (
        <FlatList
          data={favouriteGyms}
          keyExtractor={item => item.gym.id.toString()}
          renderItem={({ item }) => {
            const gym: Gym = item.gym;
            const mainImage = gym.images.find(img => img.isMain)?.url;
            const imageUrl = mainImage || "https://via.placeholder.com/100";

            return (
              <Card
                style={{
                  marginBottom: 10,
                  backgroundColor: "transparent",
                  borderColor: "#00B1E3",
                  borderWidth: 1,
                  borderRadius: 15,
                  padding: 0!,
                }}
                onPress={() => navigation.navigate("GymDetail", { gym })}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={{ uri: imageUrl }}
                    style={{ width: 100, height: 100, borderRadius: 8, margin: 0, marginRight: 16 }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text category="h6">{gym.name}</Text>
                    <Text appearance="hint" category="s2">
                      {gym.address}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRemoveFavourite(gym.id)}
                    style={{ padding: 8 }}
                    disabled={isDeleting}
                  >
                    <Icon name="heart" size={24} color="#ccc" />
                  </TouchableOpacity>
                </View>
              </Card>
            );
          }}
        />
      )}
    </Layout>
  );
};

export default FavouritesPage;
