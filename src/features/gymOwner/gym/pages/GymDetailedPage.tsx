import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Text, Button, Card, Modal } from "@ui-kitten/components";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFetchGymById } from "../hooks";
import { useDeleteService } from "../hooks/service.hook";
import { ServiceForm } from "../componets/ServiceForm";
import { GymAmenityManager } from "../componets/GymAmenityCRUD";
import { UploadGymPhotoModal } from "../componets/UploadGymPhotoModal";

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
      <Card style={styles.card}>
        <Text category="h5">{gym?.name}</Text>
        <Text appearance="hint">{gym?.address || "Без адреса"}</Text>
        <Text style={styles.info}>📞 {gym?.phone || "Телефон не указан"}</Text>
        <Text style={styles.info}>🕒 {JSON.stringify(gym?.workingHours)}</Text>

        <Button style={styles.button} onPress={() => navigation.navigate("EditGymPage", { gymId })}>
          ✏️ Редактировать зал
        </Button>

        <Button
          appearance="outline"
          style={styles.button}
          onPress={() => setPhotoModalVisible(true)} // 👈 открываем модал
        >
          🖼️ Добавить фото
        </Button>
      </Card>

      <GymAmenityManager gymId={gymId} />

      <View style={styles.header}>
        <Text category="h6">Услуги</Text>
        <TouchableOpacity onPress={() => setCreateVisible(true)}>
          <Ionicons name="add-circle-outline" size={28} color="#3366FF" />
        </TouchableOpacity>
      </View>
      {gym?.services?.map(service => (
        <Card key={service.id} style={styles.serviceCard}>
          <View style={styles.serviceRow}>
            <View style={{ flex: 1 }}>
              <Text category="s1">{service.name}</Text>
              <Text appearance="hint">
                💸 {service.price / 100} сум | 🕒 {service.durationMinutes} мин.
              </Text>
            </View>
            <View style={styles.iconRow}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedService(service);
                  setEditVisible(true);
                }}
              >
                <Ionicons name="pencil" size={22} color="#3366FF" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(service.id)}>
                <Ionicons name="trash" size={22} color="#FF3D71" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      ))}

      <Modal visible={isCreateVisible} backdropStyle={styles.backdrop} onBackdropPress={() => setCreateVisible(false)}>
        <View style={styles.modal}>
          <ServiceForm
            gymId={gymId}
            onSuccess={() => {
              refetch();
              setCreateVisible(false);
            }}
          />
        </View>
      </Modal>

      <Modal visible={isEditVisible} backdropStyle={styles.backdrop} onBackdropPress={() => setEditVisible(false)}>
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
      </Modal>

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
  },
  card: {
    marginBottom: 20,
    padding: 16,
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
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    margin: 16,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
