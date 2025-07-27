import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text, List, IconButton, Divider, Button, Avatar } from "react-native-paper";
import { useFetchAllServiceCategory, useDeleteServiceCategory } from "../hooks/serviceCategoryHooks";
import { CreateServiceCategoryModal } from "./CreateServiceCategoryModal";

export const ServiceCategoryList = () => {
  const { data, isLoading, isError } = useFetchAllServiceCategory();
  const { mutate: deleteCategory } = useDeleteServiceCategory();
  const [modalVisible, setModalVisible] = useState(false);

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
        <Text>Ошибка при загрузке категорий</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Button mode="contained" onPress={() => setModalVisible(true)} style={styles.createButton}>
        Создать категорию
      </Button>
      <FlatList
        data={data?.data || []}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <List.Item
              title={`${item.name} (${item.type})`}
              description={item.icon}
              left={() => <Avatar.Icon icon={item.icon} style={{ backgroundColor: item.color || "#ccc" }} />}
              right={() => (
                <IconButton icon="delete-outline" onPress={() => deleteCategory(item.id)} iconColor="#e74c3c" />
              )}
            />
            <Divider />
          </View>
        )}
      />
      <CreateServiceCategoryModal visible={modalVisible} onDismiss={() => setModalVisible(false)} />
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  createButton: {
    margin: 16,
  },
});
