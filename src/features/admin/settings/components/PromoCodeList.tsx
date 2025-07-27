import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text, List, IconButton, Divider, Chip, Button } from "react-native-paper";
import { CreatePromoCodeModal } from "./CreatePromoCodeModal";
import { useDeletePromoCode, useFetchAllPromoCode } from "../hooks/promoCodeHooks";

export const PromoCodeList = () => {
  const { data, isLoading, isError } = useFetchAllPromoCode();
  const { mutate: deletePromoCode } = useDeletePromoCode();
  const [modalVisible, setModalVisible] = useState(false);

  const renderTypeLabel = (type: string, value: number) => {
    switch (type) {
      case "PERCENTAGE":
        return `-${value}%`;
      case "FIXED":
        return `-${value / 100} сум`;
      case "FREE_SERVICE":
        return `Бесплатно`;
      default:
        return "";
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Загрузка...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text>Ошибка при загрузке промокодов</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Button mode="contained" style={styles.createButton} onPress={() => setModalVisible(true)}>
        Создать промокод
      </Button>

      <FlatList
        data={data?.data || []}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <List.Item
              title={`${item.code} ${item.isActive ? "" : "(неактивен)"}`}
              description={`Тип: ${item.type} | ${renderTypeLabel(item.type, item.value)}\nСрок: ${new Date(
                item.validFrom
              ).toLocaleDateString()} - ${new Date(item.validTo).toLocaleDateString()}`}
              right={() => (
                <IconButton icon="delete-outline" onPress={() => deletePromoCode(item.id)} iconColor="#e74c3c" />
              )}
            />
            <View style={styles.metaRow}>
              {item.minAmount && (
                <Chip style={styles.chip} icon="currency-usd">
                  Мин: {item.minAmount / 100} сум
                </Chip>
              )}
              {item.maxDiscount && (
                <Chip style={styles.chip} icon="sale">
                  Макс: {item.maxDiscount / 100} сум
                </Chip>
              )}
              {item.usageLimit && (
                <Chip style={styles.chip} icon="repeat">
                  Использовано: {item.usageCount}/{item.usageLimit}
                </Chip>
              )}
            </View>
            <Divider />
          </View>
        )}
      />

      <CreatePromoCodeModal visible={modalVisible} onDismiss={() => setModalVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
    backgroundColor: "#fff",
  },
  itemContainer: {
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    overflow: "hidden",
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  chip: {
    marginRight: 8,
    marginTop: 4,
    backgroundColor: "#ecf0f1",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  createButton: {
    margin: 16,
    borderRadius: 8,
  },
});
