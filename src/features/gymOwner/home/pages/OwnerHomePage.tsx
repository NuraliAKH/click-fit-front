import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, Card, Button, Avatar, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OwnerStackParamList } from "../../../../types/RootStackParamList";

const OwnerHomePage = () => {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<OwnerStackParamList>>();

  const stats = [
    {
      title: "Мои залы",
      count: 4,
      icon: "dumbbell",
      color: "#2ecc71",
      navigateTo: "MyGyms",
    },
    {
      title: "Бронирования",
      count: 18,
      icon: "calendar-check-outline",
      color: "#3498db",
      navigateTo: "Bookings",
    },
    {
      title: "Активные клиенты",
      count: 12,
      icon: "account-group-outline",
      color: "#f39c12",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Добро пожаловать 👋
      </Text>

      <View style={styles.cardsContainer}>
        {stats.map((item, index) => (
          <Card
            key={index}
            style={[styles.card, { backgroundColor: item.color + "22" }]}
            onPress={() => item.navigateTo && navigation.navigate({ name: item.navigateTo as any, params: undefined })}
          >
            <Card.Title
              title={item.title}
              subtitle={`Всего: ${item.count}`}
              left={props => <Avatar.Icon {...props} icon={item.icon} style={{ backgroundColor: item.color }} />}
              titleStyle={styles.cardTitle}
              subtitleStyle={styles.cardSubtitle}
            />
          </Card>
        ))}
      </View>

      <View style={styles.actions}>
        <Button
          mode="contained"
          icon="plus"
          onPress={() => navigation.navigate("MyGyms")} // можешь заменить на CreateGym
        >
          Добавить новый зал
        </Button>
      </View>
    </ScrollView>
  );
};

export default OwnerHomePage;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f4f6f8",
  },
  title: {
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  cardsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  card: {
    borderRadius: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2d3436",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#636e72",
  },
  actions: {
    marginTop: 10,
    alignItems: "center",
  },
});
