import React, { useState } from "react";
import { View, Image, ScrollView } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Button, Text, Layout, Modal, Card } from "@ui-kitten/components";
import { useCreateBooking } from "../../bookings/hooks";
import CreateBookingModal from "../../bookings/components/CreateBookingModal";

type GymImage = { url: string; isMain: boolean };
type Gym = { id: number; name: string; address: string; images: GymImage[]; services: any[] };
type RootStackParamList = { GymDetail: { gym: Gym } };
type GymDetailRouteProp = RouteProp<RootStackParamList, "GymDetail">;

const GymDetailPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute<GymDetailRouteProp>();
  const { gym } = route.params;
  const { mutate: createBooking } = useCreateBooking();
  const mainImage = gym.images.find(img => img.isMain)?.url || "https://via.placeholder.com/300";

  return (
    <Layout style={{ flex: 1, padding: 16 }}>
      <ScrollView>
        <Image source={{ uri: mainImage }} style={{ width: "100%", height: 200, borderRadius: 12 }} />
        <Text category="h5" style={{ marginTop: 16 }}>
          {gym.name}
        </Text>
        <Text appearance="hint" style={{ marginBottom: 16 }}>
          {gym.address}
        </Text>

        {gym.images.length > 1 && (
          <>
            <Text category="s1" style={{ marginBottom: 8 }}>
              Gallery
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {gym.images.map((img, idx) => (
                <Image
                  key={idx}
                  source={{ uri: img.url }}
                  style={{ width: 100, height: 100, marginRight: 8, borderRadius: 8 }}
                />
              ))}
            </ScrollView>
          </>
        )}

        <Button style={{ marginTop: 24 }} onPress={() => setModalVisible(true)}>
          Book Now
        </Button>

        <Modal visible={modalVisible} backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <Card disabled={true}>
            <CreateBookingModal
              visible={modalVisible}
              onDismiss={() => setModalVisible(false)}
              onSubmit={booking => createBooking(booking)}
              services={gym.services}
              gymId={gym.id}
            />
          </Card>
        </Modal>
      </ScrollView>
    </Layout>
  );
};

export default GymDetailPage;
