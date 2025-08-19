import React, { useState } from "react";
import { View, Image, ScrollView, TouchableOpacity, Linking } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { Text, Layout, Modal, Card } from "@ui-kitten/components";
import { useCreateBooking } from "../../bookings/hooks";
import CreateBookingModal from "../../bookings/components/CreateBookingModal";
import CustomHeader from "../../../../components/CustomHeader";
import GymCardsList from "../../../../components/GymCardsList";
import CategoryCard from "../../../../components/CategoryCard";
import Button from "../../../../components/Button";

type GymImage = { url: string; isMain: boolean };
type Gym = {
  amenities: any[];
  longitude: any;
  latitude: any;
  id: number;
  name: string;
  address: string;
  images: GymImage[];
  services: any[];
  description: string;
};

type RootStackParamList = { GymDetail: { gym: Gym } };
type GymDetailRouteProp = RouteProp<RootStackParamList, "GymDetail">;

const GymDetailPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute<GymDetailRouteProp>();
  const navigation = useNavigation();
  const { gym } = route.params;
  const { mutate: createBooking } = useCreateBooking();

  const mainImage = gym.images.find(img => img.isMain)?.url || "https://via.placeholder.com/300";

  return (
    <Layout style={{ flex: 1, backgroundColor: "transparent" }}>
      <CustomHeader title={gym.name} showBackButton onPressBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Image source={{ uri: mainImage }} style={{ width: "100%", height: 200, borderRadius: 12 }} />

        <Text appearance="hint" style={{ marginVertical: 16 }}>
          {gym.description || "No description available."}
        </Text>

        {gym.images.length > 1 && (
          <GymCardsList title="Gallery">
            {gym.images.map((img, idx) => (
              <Image
                key={idx}
                source={{ uri: img.url }}
                style={{
                  width: 100,
                  height: 100,
                  marginRight: 8,
                  borderRadius: 8,
                }}
              />
            ))}
          </GymCardsList>
        )}

        <GymCardsList title="Services">
          {gym.services.map((service, index) => (
            <CategoryCard
              key={index}
              title={service.name}
              subtitle={service.description}
              image={service.category?.icon || "https://via.placeholder.com/150"}
            />
          ))}
        </GymCardsList>

        <GymCardsList title="Amenities">
          {gym.amenities.map((amenity, index) => (
            <CategoryCard
              key={index}
              title={amenity?.amenity?.name || "Unnamed"}
              image={amenity?.amenity?.icon || "https://via.placeholder.com/150"}
            />
          ))}
        </GymCardsList>

        <View>
          <Text category="h6" style={{ marginBottom: 8 }}>
            Address
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(`https://www.google.com/maps?q=${gym.latitude},${gym.longitude}`)}
          >
            <Text status="primary">📍 Open in Google Maps</Text>
          </TouchableOpacity>
        </View>

        <Button style={{ marginTop: 24 }} onPress={() => setModalVisible(true)}>
          Book Now
        </Button>

        <CreateBookingModal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          onSubmit={booking => createBooking(booking)}
          services={gym.services}
          gymId={gym.id}
        />
      </ScrollView>
    </Layout>
  );
};

export default GymDetailPage;
