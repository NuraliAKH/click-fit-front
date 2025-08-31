import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Layout, Text, useTheme, Divider } from "@ui-kitten/components";
import IconFA from "react-native-vector-icons/MaterialCommunityIcons";
import { useFetchAllServiceCategory, useDeleteServiceCategory } from "../hooks/serviceCategoryHooks";
import { CreateServiceCategoryModal } from "./CreateServiceCategoryModal";
import Button from "../../../../components/Button";

export const ServiceCategoryList = () => {
  const { data, isLoading, isError } = useFetchAllServiceCategory();
  const { mutate: deleteCategory } = useDeleteServiceCategory();
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useTheme();

  if (isLoading) {
    return (
      <Layout style={styles.centered}>
        <Text>Загрузка...</Text>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout style={styles.centered}>
        <Text status="danger">Ошибка при загрузке категорий</Text>
      </Layout>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Button onPress={() => setModalVisible(true)} style={styles.createButton}>
        Создать категорию
      </Button>

      <FlatList
        data={data?.data || []}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Layout style={styles.itemContainer} level="2">
            <View style={styles.itemRow}>
              <View
                style={{
                  backgroundColor: item.color || "#999",
                  borderRadius: 24,
                  width: 48,
                  height: 48,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconFA name={item.icon} size={24} color="#fff" />
              </View>
              <View style={styles.itemText}>
                <Text category="s1">{`${item.name} (${item.type})`}</Text>
                <Text category="c1" appearance="hint">
                  {item.icon}
                </Text>
              </View>
              <IconFA
                name="trash-can-outline"
                size={24}
                color={theme["color-danger-500"]}
                onPress={() => deleteCategory(item.id)}
              />
            </View>
            <Divider style={{ marginTop: 8 }} />
          </Layout>
        )}
      />

      <CreateServiceCategoryModal visible={modalVisible} onDismiss={() => setModalVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: "transparent",
    borderColor: "#00B1E3",
    borderWidth: 1,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    flex: 1,
    marginLeft: 12,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  createButton: {
    margin: 16,
  },
});
