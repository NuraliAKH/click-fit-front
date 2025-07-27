import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useCreateGym, useFetchAllGym, useUpdateGym } from "../hooks";
import { Gym } from "../types/Gym";
import { GymCard } from "../componets/GymCard";
import { CreateGymModal } from "../componets/CreateGymModal";
import { EditGymModal } from "../componets/EditGymModal";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OwnerStackParamList } from "../../../../types/RootStackParamList";

export const GymsListScreen = () => {
  const { data: gyms = [], isLoading } = useFetchAllGym();
  const { mutate: createGym } = useCreateGym();
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedGym, setSelectedGym] = useState<Gym>({} as Gym);
  const navigation = useNavigation<NativeStackNavigationProp<OwnerStackParamList>>();
  if (isLoading) {
    return <Text>Загрузка...</Text>;
  }
  const handleCreate = (data: any) => {
    createGym(data);
    setCreateVisible(false);
  };

  const handleUpdate = () => {
    setEditVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
        Список спортзалов
      </Text>

      <Button mode="contained" onPress={() => setCreateVisible(true)} style={{ marginBottom: 16 }}>
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

      <CreateGymModal visible={createVisible} onDismiss={() => setCreateVisible(false)} onCreate={handleCreate} />

      <EditGymModal
        visible={editVisible}
        onDismiss={() => setEditVisible(false)}
        onUpdate={handleUpdate}
        gym={selectedGym}
      />
    </ScrollView>
  );
};
