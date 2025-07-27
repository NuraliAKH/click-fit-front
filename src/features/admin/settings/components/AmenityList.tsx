import React, { useState } from "react";
import { FlatList, View, StyleSheet, Alert } from "react-native";
import { Text, Button, Card, IconButton, Modal, Portal, TextInput } from "react-native-paper";
import { useCreateAmenity, useDeleteAmenity, useFetchAllAmenity } from "../hooks/amenityHooks";

export const AmenityList = () => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [icon, setIcon] = useState("");
  const { data: amenities, isLoading } = useFetchAllAmenity();
  const createAmenity = useCreateAmenity();
  const deleteAmenity = useDeleteAmenity();

  const handleDelete = (id: number) => {
    Alert.alert("Удалить удобство?", "Вы уверены?", [
      { text: "Отмена", style: "cancel" },
      {
        text: "Удалить",
        style: "destructive",
        onPress: () => deleteAmenity.mutate(id),
      },
    ]);
  };

  const handleCreate = () => {
    if (name.trim() && key.trim() && icon.trim()) {
      createAmenity.mutate(
        {
          name: name.trim(),
          key: key.trim(),
          icon: icon.trim(),
        },
        {
          onSuccess: () => {
            setName("");
            setKey("");
            setIcon("");
            setVisible(false);
          },
        }
      );
    } else {
      Alert.alert("Ошибка", "Все поля обязательны");
    }
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => setVisible(true)} style={styles.addButton}>
        Добавить удобство
      </Button>

      {isLoading ? (
        <Text>Загрузка...</Text>
      ) : (
        <FlatList
          data={amenities?.data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Title
                title={`${item.icon} ${item.name}`}
                right={() => <IconButton icon="delete-outline" onPress={() => handleDelete(item.id)} />}
              />
            </Card>
          )}
        />
      )}

      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={styles.modal}>
          <Text variant="titleMedium">Новое удобство</Text>
          <TextInput label="Название" value={name} onChangeText={setName} style={{ marginTop: 12 }} />
          <TextInput label="Ключ (key)" value={key} onChangeText={setKey} style={{ marginTop: 12 }} />
          <TextInput label="Иконка (icon)" value={icon} onChangeText={setIcon} style={{ marginTop: 12 }} />
          <Button mode="contained" onPress={handleCreate} style={{ marginTop: 16 }}>
            Сохранить
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    flex: 1,
  },
  addButton: {
    marginBottom: 16,
  },
  card: {
    marginBottom: 12,
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
});
