import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Button, Card, Text, ActivityIndicator, Portal, Modal, IconButton } from "react-native-paper";
import { useFetchGymById } from "../hooks";
import { useDeleteService } from "../hooks/service.hook";
import { ServiceForm } from "../componets/ServiceForm";

export const GymDetailedPage: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { gymId } = route.params;
  if (!gymId) {
    return <Text>Не указан ID спортзала</Text>;
  }
  const { data: gym, isLoading, refetch } = useFetchGymById(+gymId);

  const deleteService = useDeleteService();

  const [selectedService, setSelectedService] = useState<any>(null);
  const [isCreateVisible, setCreateVisible] = useState(false);
  const [isEditVisible, setEditVisible] = useState(false);

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

  if (isLoading) return <ActivityIndicator style={{ marginTop: 40 }} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={gym?.name} subtitle={gym?.address || "Без адреса"} />
        <Card.Content>
          <Text style={styles.description}>📞 Телефон: {gym?.phone || "Не указан"}</Text>
          <Text style={styles.description}>🕒 Время работы: {JSON.stringify(gym?.workingHours, null, 2)}</Text>

          <Button mode="contained" onPress={() => navigation.navigate("EditGymPage", { gymId })} style={styles.button}>
            ✏️ Редактировать зал
          </Button>

          <Button
            mode="outlined"
            onPress={() => navigation.navigate("CreateStaffPage", { gymId })}
            style={styles.button}
          >
            ➕ Добавить сотрудника
          </Button>
        </Card.Content>
      </Card>

      <View style={styles.serviceHeader}>
        <IconButton icon="plus" onPress={() => setCreateVisible(true)} />
      </View>

      {(gym?.services || []).map(service => (
        <Card key={service.id} style={styles.serviceCard}>
          <Card.Title
            title={service.name}
            subtitle={`💸 ${service.price / 100} сум | 🕒 ${service.durationMinutes} мин.`}
            right={() => (
              <View style={{ flexDirection: "row" }}>
                <IconButton
                  icon="pencil"
                  onPress={() => {
                    setSelectedService(service);
                    setEditVisible(true);
                  }}
                />
                <IconButton icon="delete" onPress={() => handleDelete(service.id)} />
              </View>
            )}
          />
        </Card>
      ))}

      {/* ===== Create Modal ===== */}
      <Portal>
        <Modal visible={isCreateVisible} onDismiss={() => setCreateVisible(false)} contentContainerStyle={styles.modal}>
          <ServiceForm
            gymId={gymId}
            onSuccess={() => {
              refetch();
              setCreateVisible(false);
            }}
          />
        </Modal>
      </Portal>

      {/* ===== Edit Modal ===== */}
      <Portal>
        <Modal visible={isEditVisible} onDismiss={() => setEditVisible(false)} contentContainerStyle={styles.modal}>
          <ServiceForm
            gymId={gymId}
            initialValues={selectedService}
            onSuccess={() => {
              refetch();
              setEditVisible(false);
              setSelectedService(null);
            }}
          />
        </Modal>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 20,
  },
  description: {
    marginBottom: 8,
    color: "#555",
  },
  button: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  serviceCard: {
    marginBottom: 10,
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    margin: 16,
    borderRadius: 12,
  },
  serviceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
});
