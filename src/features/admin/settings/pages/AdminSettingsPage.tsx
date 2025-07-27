import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { List, Divider, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Feather, MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";

export const AdminSettingsPage = () => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>⚙️ Настройки</Text>

      <List.Section>
        <List.Subheader>Основные</List.Subheader>

        <List.Item
          title="Удобства (Amenity)"
          description="Добавление и управление удобствами"
          left={props => <Feather name="check-square" size={24} color="#2ecc71" />}
          onPress={() => navigation.navigate("AmenitySettings")}
        />
        <Divider />

        <List.Item
          title="Промокоды"
          description="Управление скидочными кодами"
          left={props => <MaterialIcons name="local-offer" size={24} color="#e67e22" />}
          onPress={() => navigation.navigate("PromocodeSettings")}
        />
        <Divider />

        <List.Item
          title="Категории услуг"
          description="Категории для фильтрации и сортировки"
          left={props => <Ionicons name="grid-outline" size={24} color="#9b59b6" />}
          onPress={() => navigation.navigate("ServiceCategorySettings")}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>Система</List.Subheader>

        <List.Item
          title="Роли и права"
          description="Управление ролями и доступами"
          left={props => <FontAwesome5 name="user-shield" size={20} color="#3498db" />}
          onPress={() => navigation.navigate("RoleSettings")}
        />
        <Divider />

        <List.Item
          title="Уведомления"
          description="Настройки пуш- и email-уведомлений"
          left={props => <Ionicons name="notifications-outline" size={24} color="#f39c12" />}
          onPress={() => navigation.navigate("NotificationSettings")}
        />
        <Divider />

        <List.Item
          title="Информация о системе"
          description="Версия, обновления и статус"
          left={props => <Feather name="info" size={24} color="#95a5a6" />}
          onPress={() => navigation.navigate("SystemInfo")}
        />
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
});
