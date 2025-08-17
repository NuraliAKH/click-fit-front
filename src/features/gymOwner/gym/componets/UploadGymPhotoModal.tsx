import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Alert, Platform, Switch } from "react-native";
import { Modal, Button, Text } from "@ui-kitten/components";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { useUploadGymPhoto } from "../hooks/useUploadGymPhoto";

type Props = {
  visible: boolean;
  gymId: number;
  onClose: () => void;
  onSuccess?: () => void;
};

type UploadImage = {
  uri: string;
  type: string;
  fileName: string;
};

export const UploadGymPhotoModal: React.FC<Props> = ({ visible, gymId, onClose, onSuccess }) => {
  const [isMain, setIsMain] = useState(false);
  const [image, setImage] = useState<UploadImage | null>(null);
  const uploadMutation = useUploadGymPhoto();

  const handleSelectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Нет доступа", "Разрешение на доступ к фото не получено");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ исправлено
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];
      setImage({
        uri: asset.uri,
        type: asset.type ?? "image/jpeg",
        fileName: asset.fileName ?? `photo-${Date.now()}.jpg`,
      });
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    try {
      await uploadMutation.mutateAsync({
        gymId,
        image,
        isMain,
      });

      Alert.alert("Успешно", "Фото успешно загружено");
      onSuccess?.();
      onClose();
      setImage(null);
      setIsMain(false);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      Alert.alert("Ошибка", "Не удалось загрузить изображение");
    }
  };

  return (
    <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={onClose}>
      <View style={styles.modal}>
        <Text category="s1" style={{ marginBottom: 12 }}>
          Загрузить фото
        </Text>

        <TouchableOpacity onPress={handleSelectImage} style={styles.imagePicker}>
          <Ionicons name="image-outline" size={40} color="#888" />
          <Text style={{ marginTop: 8 }}>Выбрать изображение</Text>
          {image?.fileName && <Text appearance="hint">{image.fileName}</Text>}
        </TouchableOpacity>

        <View style={styles.switchRow}>
          <Text>Сделать главным</Text>
          <Switch value={isMain} onValueChange={setIsMain} />
        </View>

        <Button disabled={!image || uploadMutation.isPending} onPress={handleUpload} style={{ marginTop: 16 }}>
          {uploadMutation.isPending ? "Загрузка..." : "✅ Загрузить"}
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    margin: 16,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  imagePicker: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    minHeight: 100,
    marginBottom: 12,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
