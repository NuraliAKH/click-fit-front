import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, ListItem, Divider } from "@ui-kitten/components";
import { Feather, MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";

const settingsItems = [
  {
    title: "Удобства (Amenity)",
    description: "Добавление и управление удобствами",
    icon: <Feather name="check-square" size={24} color="#2ecc71" />,
    route: "AmenitySettings",
  },
  {
    title: "Промокоды",
    description: "Управление скидочными кодами",
    icon: <MaterialIcons name="local-offer" size={24} color="#e67e22" />,
    route: "PromocodeSettings",
  },
  {
    title: "Категории услуг",
    description: "Категории для фильтрации и сортировки",
    icon: <Ionicons name="grid-outline" size={24} color="#9b59b6" />,
    route: "ServiceCategorySettings",
  },
];

const systemItems = [
  {
    title: "Роли и права",
    description: "Управление ролями и доступами",
    icon: <FontAwesome5 name="user-shield" size={20} color="#3498db" />,
    route: "RoleSettings",
  },
  {
    title: "Уведомления",
    description: "Настройки пуш- и email-уведомлений",
    icon: <Ionicons name="notifications-outline" size={24} color="#f39c12" />,
    route: "NotificationSettings",
  },
  {
    title: "Информация о системе",
    description: "Версия, обновления и статус",
    icon: <Feather name="info" size={24} color="#95a5a6" />,
    route: "SystemInfo",
  },
];

export const AdminSettingsPage = () => {
  const navigation = useNavigation<any>();

  const renderItem = (item: any, index: number) => (
    <React.Fragment key={index}>
      <ListItem
        title={item.title}
        description={item.description}
        accessoryLeft={() => item.icon}
        onPress={() => navigation.navigate(item.route)}
        style={styles.item}
      />
      <Divider />
    </React.Fragment>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text category="h5" style={styles.title}>
        ⚙️ Настройки
      </Text>

      <Text category="s1" style={styles.sectionTitle}>
        Основные
      </Text>
      {settingsItems.map(renderItem)}

      <Text category="s1" style={styles.sectionTitle}>
        Система
      </Text>
      {systemItems.map(renderItem)}
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
    marginBottom: 16,
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 8,
    color: "#888",
    fontWeight: "600",
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 4,
  },
});
