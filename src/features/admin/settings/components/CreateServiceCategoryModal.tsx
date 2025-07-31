import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Modal, Text, Input, Button, Layout } from "@ui-kitten/components";
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
    <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={onDismiss}>
      <Layout style={styles.modal} level="1">
        <Text category="h6" style={styles.title}>
          Создать категорию
        </Text>
        <Input label="Тип (уникальный)" value={type} onChangeText={setType} style={styles.input} />
        <Input label="Название" value={name} onChangeText={setName} style={styles.input} />
        <Input label="Иконка (название) " value={icon} onChangeText={setIcon} style={styles.input} />
        <Input label="Цвет (#HEX)" value={color} onChangeText={setColor} style={styles.input} />
        <Button onPress={handleSubmit} disabled={isPending} style={styles.button}>
          {isPending ? "Создание..." : "Создать"}
        </Button>
      </Layout>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    borderRadius: 12,
    padding: 20,
    paddingBottom: 100,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
  },
});
