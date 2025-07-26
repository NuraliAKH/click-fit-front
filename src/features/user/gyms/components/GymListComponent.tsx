import React from "react";
import { FlatList, View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
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

  if (isLoading) return <ActivityIndicator size="large" style={styles.loader} color="#2ecc71" />;

  return (
    <FlatList
      data={gyms}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => {
        const mainImage = item.images.find(img => img.isMain)?.url;
        const imageUrl = mainImage || "https://via.placeholder.com/100";

        return (
          <TouchableOpacity onPress={() => navigation.navigate("GymDetail", { gym: item })}>
            <View style={styles.card}>
              <Image source={{ uri: imageUrl }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.address}>{item.address}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default GymListComponent;

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { padding: 16 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  address: {
    fontSize: 14,
    color: "#777",
  },
});
