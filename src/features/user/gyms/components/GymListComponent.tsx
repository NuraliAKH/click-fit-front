import React from "react";
import { FlatList, View, Image } from "react-native";
import { Spinner, Card, Text, Layout } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
};

const GymListComponent = ({ gyms, isLoading }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (isLoading) {
    return (
      <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner size="giant" />
      </Layout>
    );
  }

  return (
    <FlatList
      data={gyms}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => {
        const mainImage = item.images.find(img => img.isMain)?.url;
        const imageUrl = mainImage || "https://via.placeholder.com/100";

        return (
          <Card style={{ marginBottom: 16 }} onPress={() => navigation.navigate("GymDetail", { gym: item })}>
            <View style={{ flexDirection: "row" }}>
              <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100, borderRadius: 8, marginRight: 16 }} />
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text category="h6">{item.name}</Text>
                <Text appearance="hint" category="s2">
                  {item.address}
                </Text>
              </View>
            </View>
          </Card>
        );
      }}
    />
  );
};

export default GymListComponent;
