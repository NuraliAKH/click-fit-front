import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Alert, TouchableOpacity, Image, Linking } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Text, Button, Card, Modal } from "@ui-kitten/components";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFetchGymById } from "../hooks";
import { useDeleteService } from "../hooks/service.hook";
import { ServiceForm } from "../componets/ServiceForm";
import { GymAmenityManager } from "../componets/GymAmenityCRUD";
import { UploadGymPhotoModal } from "../componets/UploadGymPhotoModal";
import CustomHeader from "../../../../components/CustomHeader";
import RowCard from "../../../../components/RowCard";
import UniversalModal from "../../../../components/Modal";

export const GymDetailedPage: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { gymId } = route.params;

  const { data: gym, isLoading, refetch } = useFetchGymById(+gymId);
  const deleteService = useDeleteService();

  const [selectedService, setSelectedService] = useState<any>(null);
  const [isCreateVisible, setCreateVisible] = useState(false);
  const [isEditVisible, setEditVisible] = useState(false);
  const [isPhotoModalVisible, setPhotoModalVisible] = useState(false); // 👈 новое состояние

  const handleDelete = (id: number) => {
    Alert.alert("Удалить услугу", "Вы уверены?", [
      { text: "Отмена" },
      {
        text: "Удалить",
        style: "destructive",
        onPress: async () => {
          await deleteService.mutateAsync(id);
          refetch();
        },
      },
    ]);
  };

  if (!gymId) return <Text category="h6">Не указан ID зала</Text>;
  if (isLoading) return <Text>Загрузка...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomHeader title={gym?.name || "Name"} />
      {gym?.images?.length && gym.images.length > 0 ? (
        <View style={{ backgroundColor: "transparent" }}>
          {gym.images.find((img: any) => img.isMain)?.url ? (
            <Image
              source={{ uri: gym.images.find((img: any) => img.isMain)?.url }}
              style={{ width: "100%", height: 200, borderRadius: 12 }}
              resizeMode="cover"
            />
          ) : (
            <View
              style={{
                width: "100%",
                height: 200,
                backgroundColor: "#f0f0f0",
                borderRadius: 12,
              }}
            />
          )}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
            style={{ marginTop: 10 }}
          >
            {gym.images.map((img: any, index: number) => (
              <Image
                key={index}
                source={{ uri: img.url }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                  marginRight: 10,
                }}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
        </View>
      ) : null}

      <View style={styles.card}>
        {/* Working Hours */}
        <Text appearance="hint">🕒 {JSON.stringify(gym?.workingHours)}</Text>

        {/* Description */}
        <Text style={styles.info}>{gym?.description || "Описание отсутствует"}</Text>

        {/* Phone */}
        <Text style={styles.info}>📞 {gym?.phone || "Телефон не указан"}</Text>

        {/* Location Link */}
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${gym?.latitude},${gym?.longitude}`)
          }
        >
          <Text style={[styles.info, { color: "blue", textDecorationLine: "underline" }]}>📍 Открыть на карте</Text>
        </TouchableOpacity>
      </View>

      <GymAmenityManager gymId={gymId} />

      <View style={styles.header}>
        <Text category="h6" style={{ color: "#00B1E3" }}>
          Услуги
        </Text>
        <TouchableOpacity onPress={() => setCreateVisible(true)}>
          <Ionicons name="add-circle-outline" size={28} color="#00B1E3" />
        </TouchableOpacity>
      </View>
      {gym?.services?.map(service => (
        <RowCard title={service.name} sub1={service.description} sub2={`Price: ${service.price} so'm`} />
        // <Card key={service.id} style={styles.serviceCard}>
        //   <View style={styles.serviceRow}>
        //     <View style={{ flex: 1 }}>
        //       <Text category="s1">{service.name}</Text>
        //       <Text appearance="hint">
        //         💸 {service.price / 100} сум | 🕒 {service.durationMinutes} мин.
        //       </Text>
        //     </View>
        //     <View style={styles.iconRow}>
        //       <TouchableOpacity
        //         onPress={() => {
        //           setSelectedService(service);
        //           setEditVisible(true);
        //         }}
        //       >
        //         <Ionicons name="pencil" size={22} color="#3366FF" style={styles.icon} />
        //       </TouchableOpacity>
        //       <TouchableOpacity onPress={() => handleDelete(service.id)}>
        //         <Ionicons name="trash" size={22} color="#FF3D71" style={styles.icon} />
        //       </TouchableOpacity>
        //     </View>
        //   </View>
        // </Card>
      ))}

      <UniversalModal visible={isCreateVisible} backdropStyle={styles.backdrop} onClose={() => setCreateVisible(false)}>
        <View style={styles.modal}>
          <ServiceForm
            gymId={gymId}
            onSuccess={() => {
              refetch();
              setCreateVisible(false);
            }}
          />
        </View>
      </UniversalModal>

      <UniversalModal visible={isEditVisible} backdropStyle={styles.backdrop} onClose={() => setEditVisible(false)}>
        <View style={styles.modal}>
          <ServiceForm
            gymId={gymId}
            initialValues={selectedService}
            onSuccess={() => {
              refetch();
              setEditVisible(false);
              setSelectedService(null);
            }}
          />
        </View>
      </UniversalModal>

      {/* Новый модал для фото */}
      <UploadGymPhotoModal
        gymId={gymId}
        visible={isPhotoModalVisible}
        onClose={() => setPhotoModalVisible(false)}
        onSuccess={refetch}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "transparent",
  },
  card: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "transparent",
  },
  info: {
    marginTop: 6,
  },
  button: {
    marginTop: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  serviceCard: {
    marginBottom: 12,
  },
  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 12,
  },
  modal: {
    backgroundColor: "transparent",
    padding: 0,
    borderRadius: 12,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  scrollContainer: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
});
