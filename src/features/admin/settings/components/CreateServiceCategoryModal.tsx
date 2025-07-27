import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Portal, Text, TextInput, Button } from "react-native-paper";
import { useCreateServiceCategory } from "../hooks/serviceCategoryHooks";

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

export const CreateServiceCategoryModal = ({ visible, onDismiss }: Props) => {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");

  const { mutate: createCategory, isPending } = useCreateServiceCategory();

  const handleSubmit = () => {
    if (!type.trim() || !name.trim() || !icon.trim() || !color.trim()) return;
    createCategory(
      { type, name, icon, color },
      {
        onSuccess: () => {
          setType("");
          setName("");
          setIcon("");
          setColor("");
          onDismiss();
        },
      }
    );
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
        <Text style={styles.title}>Создать категорию</Text>
        <TextInput label="Тип (уникальный)" value={type} onChangeText={setType} style={styles.input} />
        <TextInput label="Название" value={name} onChangeText={setName} style={styles.input} />
        <TextInput label="Иконка (название)" value={icon} onChangeText={setIcon} style={styles.input} />
        <TextInput label="Цвет (#HEX)" value={color} onChangeText={setColor} style={styles.input} />
        <Button mode="contained" onPress={handleSubmit} loading={isPending} disabled={isPending}>
          Создать
        </Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    marginBottom: 12,
  },
});
