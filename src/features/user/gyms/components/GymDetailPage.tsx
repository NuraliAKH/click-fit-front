import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { useCreateBooking } from "../../bookings/hooks";
import CreateBookingModal from "../../bookings/components/CreateBookingModal";

type GymImage = {
  url: string;
  isMain: boolean;
};

type Gym = {
  id: number;
  name: string;
  address: string;
  images: GymImage[];
  services: any[];
};

type RootStackParamList = {
  GymDetail: { gym: Gym };
};

type GymDetailRouteProp = RouteProp<RootStackParamList, "GymDetail">;

const GymDetailPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute<GymDetailRouteProp>();
  const { gym } = route.params;
  const { mutate: createBooking } = useCreateBooking();
  const mainImage = gym.images.find(img => img.isMain)?.url || "https://via.placeholder.com/300";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: mainImage }} style={styles.mainImage} />
      <Text style={styles.name}>{gym.name}</Text>
      <Text style={styles.address}>{gym.address}</Text>

      {gym.images.length > 1 && (
        <View style={styles.galleryContainer}>
          <Text style={styles.galleryTitle}>Gallery</Text>
          <ScrollView horizontal>
            {gym.images.map((image, index) => (
              <Image key={index} source={{ uri: image.url }} style={styles.thumbnail} />
            ))}
          </ScrollView>
        </View>
      )}

      <CreateBookingModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onSubmit={booking => createBooking(booking)}
        services={gym.services}
        gymId={gym.id}
      />
      <Button
        mode="contained"
        onPress={() => setModalVisible(true)}
        style={styles.button}
        contentStyle={{ paddingVertical: 8 }}
      >
        Book Now
      </Button>
    </ScrollView>
  );
};

export default GymDetailPage;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  mainImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  galleryContainer: {
    marginBottom: 20,
  },
  galleryTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
  button: {
    backgroundColor: "#2ecc71",
    borderRadius: 8,
  },
});
