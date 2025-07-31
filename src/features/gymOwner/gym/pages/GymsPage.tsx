import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, Button, Layout, Spinner } from "@ui-kitten/components";
import { useCreateGym, useFetchAllGym } from "../hooks";
import { Gym } from "../types/Gym";
import { OwnerStackParamList } from "../../../../types/RootStackParamList";
import { CreateGymModal } from "../componets/CreateGymModal";
import { EditGymModal } from "../componets/EditGymModal";
import { GymCard } from "../componets/GymCard";

export const GymsListScreen = () => {
  const { data: gyms = [], isLoading } = useFetchAllGym();
  const { mutate: createGym } = useCreateGym();
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedGym, setSelectedGym] = useState<Gym>({} as Gym);

  const navigation = useNavigation<NativeStackNavigationProp<OwnerStackParamList>>();

  const handleCreate = (data: any) => {
    createGym(data);
    setCreateVisible(false);
  };

  const handleUpdate = () => {
    setEditVisible(false);
  };

  if (isLoading) {
    return (
      <Layout style={styles.loadingContainer}>
        <Spinner size="large" />
      </Layout>
    );
  }

  return (
    <Layout style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text category="h5" style={styles.title}>
          Список спортзалов
        </Text>

        <Button onPress={() => setCreateVisible(true)} style={styles.createButton}>
          Новый зал
        </Button>

        {gyms.map((gym: any) => (
          <GymCard
            key={gym.id}
            gym={gym}
            onEdit={() => {
              setSelectedGym(gym);
              setEditVisible(true);
            }}
            onPress={() => navigation.navigate("GymDetailed", { gymId: gym.id })}
          />
        ))}
      </ScrollView>

      <CreateGymModal visible={createVisible} onDismiss={() => setCreateVisible(false)} onCreate={handleCreate} />

      <EditGymModal
        visible={editVisible}
        onDismiss={() => setEditVisible(false)}
        onUpdate={handleUpdate}
        gym={selectedGym}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40, // чтобы кнопки не упирались в нижний край
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 16,
  },
  createButton: {
    marginBottom: 16,
  },
});
