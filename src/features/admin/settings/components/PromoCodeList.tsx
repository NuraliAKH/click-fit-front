import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text, Button, Card } from "@ui-kitten/components";
import { useFetchAllPromoCode, useDeletePromoCode } from "../hooks/promoCodeHooks";
import { CreatePromoCodeModal } from "./CreatePromoCodeModal";
import VectorIcon from "react-native-vector-icons/MaterialCommunityIcons";

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

  const renderItem = ({ item }: any) => (
    <Card
      style={styles.card}
      header={() => (
        <View style={styles.header}>
          <Text category="s1">
            {item.code} {item.isActive ? "" : "(неактивен)"}
          </Text>
          <VectorIcon name="delete-outline" size={24} color="#e74c3c" onPress={() => deletePromoCode(item.id)} />
        </View>
      )}
    >
      <Text appearance="hint">
        Тип: {item.type} | {renderTypeLabel(item.type, item.value)}
      </Text>
      <Text appearance="hint" style={styles.dates}>
        Срок: {new Date(item.validFrom).toLocaleDateString()} - {new Date(item.validTo).toLocaleDateString()}
      </Text>
      <View style={styles.metaRow}>
        {!!item.minAmount && (
          <View style={styles.chip}>
            <VectorIcon name="currency-usd" size={16} />
            <Text style={{ marginLeft: 4 }}>Мин: {item.minAmount / 100} сум</Text>
          </View>
        )}
        {!!item.maxDiscount && (
          <View style={styles.chip}>
            <VectorIcon name="sale" size={16} />
            <Text style={{ marginLeft: 4 }}>Макс: {item.maxDiscount / 100} сум</Text>
          </View>
        )}
        {!!item.usageLimit && (
          <View style={styles.chip}>
            <VectorIcon name="repeat" size={16} />
            <Text style={{ marginLeft: 4 }}>
              Использовано: {item.usageCount}/{item.usageLimit}
            </Text>
          </View>
        )}
      </View>
    </Card>
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text>Загрузка...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text status="danger">Ошибка при загрузке</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Button style={styles.createButton} onPress={() => setModalVisible(true)}>
        Создать промокод
      </Button>

      <FlatList
        data={data?.data || []}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />

      <CreatePromoCodeModal visible={modalVisible} onDismiss={() => setModalVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  list: { padding: 16 },
  createButton: { margin: 16, borderRadius: 8 },
  card: { marginBottom: 12, borderRadius: 12 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 8,
  },
  chip: {
    padding: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dates: {
    marginTop: 4,
  },
});
