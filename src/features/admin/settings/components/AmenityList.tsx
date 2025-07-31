import React, { useState } from "react";
import { View, StyleSheet, FlatList, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { Input, Button, Card, Icon, Modal, Text, useTheme } from "@ui-kitten/components";
import IconFA from "react-native-vector-icons/FontAwesome";
import { useCreateAmenity, useDeleteAmenity, useFetchAllAmenity } from "../hooks/amenityHooks";

export const AmenityList = () => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [icon, setIcon] = useState("");
  const { data: amenities, isLoading } = useFetchAllAmenity();
  const createAmenity = useCreateAmenity();
  const deleteAmenity = useDeleteAmenity();
  const theme = useTheme();

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
        { name: name.trim(), key: key.trim(), icon: icon.trim() },
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

  const renderItem = ({ item }: any) => (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <IconFA name={item.icon} size={20} color={theme["text-basic-color"]} />
        <Text style={styles.cardText}>{item.name}</Text>
        <IconFA name="trash" size={20} color="red" onPress={() => handleDelete(item.id)} />
      </View>
    </Card>
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Button onPress={() => setVisible(true)} style={styles.addButton}>
          Добавить удобство
        </Button>

        {isLoading ? (
          <Text>Загрузка...</Text>
        ) : (
          <FlatList data={amenities?.data} keyExtractor={item => item.id.toString()} renderItem={renderItem} />
        )}

        <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={() => setVisible(false)}>
          <Card disabled={true} style={styles.modal}>
            <Text category="h6" style={{ marginBottom: 12 }}>
              Новое удобство
            </Text>

            <Input placeholder="Название" value={name} onChangeText={setName} style={styles.input} />
            <Input placeholder="Ключ (key)" value={key} onChangeText={setKey} style={styles.input} />
            <Input
              placeholder="Иконка (например: wifi, bath, etc)"
              value={icon}
              onChangeText={setIcon}
              style={styles.input}
            />

            <Button onPress={handleCreate} style={{ marginTop: 16 }}>
              Сохранить
            </Button>
          </Card>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    marginBottom: 16,
  },
  card: {
    marginBottom: 12,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardText: {
    flex: 1,
    marginHorizontal: 12,
  },
  modal: {
    padding: 20,
    borderRadius: 12,
    width: 320,
    alignSelf: "center",
  },
  input: {
    marginVertical: 8,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
