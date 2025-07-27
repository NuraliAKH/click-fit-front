import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Text, Avatar, Title, useTheme } from "react-native-paper";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";

export const AdminDashboardPage = () => {
  const theme = useTheme();

  const stats = [
    {
      title: "Пользователи",
      count: 128,
      icon: <MaterialIcons name="people" size={28} color="#fff" />,
      color: "#3498db",
    },
    {
      title: "Бронирования",
      count: 320,
      icon: <FontAwesome5 name="calendar-check" size={24} color="#fff" />,
      color: "#e67e22",
    },
    {
      title: "Залы",
      count: 14,
      icon: <Ionicons name="fitness" size={28} color="#fff" />,
      color: "#2ecc71",
    },
    {
      title: "Услуги",
      count: 55,
      icon: <MaterialIcons name="miscellaneous-services" size={28} color="#fff" />,
      color: "#9b59b6",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.greeting}>👋 Добро пожаловать, Админ!</Text>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <Card key={index} style={[styles.card, { backgroundColor: stat.color }]}>
            <View style={styles.cardContent}>
              <Avatar.Icon size={48} icon={() => stat.icon} style={[styles.avatar, { backgroundColor: "#ffffff33" }]} />
              <View style={styles.textContent}>
                <Text style={styles.cardTitle}>{stat.title}</Text>
                <Title style={styles.cardCount}>{stat.count}</Title>
              </View>
            </View>
          </Card>
        ))}
      </View>

      <Card style={styles.chartCard} mode="elevated">
        <Text style={styles.chartTitle}>Активность по бронированиям</Text>
        <View style={styles.chartPlaceholder}>
          <Text style={{ color: "#aaa" }}>📊 График будет здесь</Text>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  greeting: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    marginBottom: 16,
    borderRadius: 16,
    padding: 12,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 12,
  },
  textContent: {
    flex: 1,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
  },
  cardCount: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  chartCard: {
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#fff",
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  chartPlaceholder: {
    height: 160,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
