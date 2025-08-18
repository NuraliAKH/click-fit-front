import React, { useState } from "react";
import { FlatList, View, Image, TouchableOpacity, Button } from "react-native";
import { Spinner, Card, Text, Layout } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/FontAwesome";

import { useCreateFavouriteGym, useDeleteFavouriteGym, useFetchAllFavouriteGym } from "../hooks/favouriteGymHooks";
import GymCardsList from "../../../../components/GymCardsList";
import { useFetchAllServiceCategory } from "../../../admin/settings/hooks/serviceCategoryHooks";
import CategoryCard from "../../../../components/CategoryCard";
import FloatingLabelInput from "../../../../components/Input";
import SearchInput from "../../../../components/SearchInput";
import GymCard from "../../../../components/GymCard";

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
  Gyms: { categoryId: number } | undefined;
  GymDetail: { gym: Gym };
  FavouritesPage: undefined; // Add this
};

const GymListComponent = ({ gyms, isLoading }: Props) => {
  const [q, setQ] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data: serviceCategories, isLoading: isGymsLoading } = useFetchAllServiceCategory();

  if (isLoading || isGymsLoading) {
    return (
      <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner size="giant" />
      </Layout>
    );
  }

  return (
    <Layout style={{ flex: 1, backgroundColor: "transparent" }}>
      <SearchInput
        value={q}
        onChangeText={setQ}
        placeholder="Qidiring…"
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={() => console.log("Search:", q)}
      />
      <GymCardsList title="Categories" haveSeeMore={false}>
        {serviceCategories?.data?.map((category: any) => (
          <CategoryCard
            key={category.id}
            title={category.name}
            subtitle={category.description}
            image={category.icon || "https://via.placeholder.com/100"}
            onPress={() => navigation.navigate("Gyms", { categoryId: category.id })}
          />
        ))}
      </GymCardsList>

      <GymCardsList title="Gyms" haveSeeMore={false}>
        {gyms.map((gym: Gym) => {
          const mainImage = gym.images.find((img: GymImage) => img.isMain)?.url;
          const imageUrl = mainImage || "https://via.placeholder.com/100";
          return (
            <GymCard
              key={gym.id}
              id={gym.id}
              title={gym.name}
              subtitle={gym.address}
              image={imageUrl}
              onPress={() => navigation.navigate("GymDetail", { gym })}
            />
          );
        })}
      </GymCardsList>
      {/* <FlatList
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
      /> */}
    </Layout>
  );
};

export default GymListComponent;
