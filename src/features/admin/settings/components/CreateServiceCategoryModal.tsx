import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Layout } from "@ui-kitten/components";
import { useCreateServiceCategory } from "../hooks/serviceCategoryHooks";
import UniversalModal from "../../../../components/Modal";
import FloatingLabelInput from "../../../../components/Input";
import Button from "../../../../components/Button";

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
    <UniversalModal title="Создать категорию" visible={visible} backdropStyle={styles.backdrop} onClose={onDismiss}>
      <View style={{ gap: 12 }}>
        <FloatingLabelInput
          label="Тип (уникальный)"
          placeholder="Тип (уникальный)"
          value={type}
          onChangeText={setType}
          style={styles.input}
        />
        <FloatingLabelInput
          label="Название"
          placeholder="Название"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <FloatingLabelInput
          label="Иконка (название) "
          placeholder="Иконка (название) "
          value={icon}
          onChangeText={setIcon}
          style={styles.input}
        />
        <FloatingLabelInput
          label="Цвет (#HEX)"
          placeholder="Цвет (#HEX)"
          value={color}
          onChangeText={setColor}
          style={styles.input}
        />
        <Button onPress={handleSubmit} disabled={isPending} style={styles.button}>
          {isPending ? "Создание..." : "Создать"}
        </Button>
      </View>
    </UniversalModal>
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
