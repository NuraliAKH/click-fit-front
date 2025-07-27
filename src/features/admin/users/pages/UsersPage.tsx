import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text, Avatar, Searchbar, ActivityIndicator, Divider, Card } from "react-native-paper";
import { useFetchAllUser } from "../hooks";

export const UsersListPage = () => {
  const { data, isLoading, isError } = useFetchAllUser();
  const [searchText, setSearchText] = useState("");

  const filteredUsers = data?.data.filter((user: any) =>
    `${user.firstName} ${user.lastName ?? ""} ${user.email}`.toLowerCase().includes(searchText.toLowerCase())
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text>Ошибка при загрузке пользователей</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Поиск по имени, фамилии или email"
        onChangeText={setSearchText}
        value={searchText}
        style={styles.searchbar}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        renderItem={({ item }) => (
          <Card style={styles.card} mode="contained">
            <View style={styles.userRow}>
              <Avatar.Text
                size={48}
                label={`${item.firstName?.[0] ?? ""}${item.lastName?.[0] ?? ""}`}
                style={styles.avatar}
              />
              <View style={styles.userInfo}>
                <Text style={styles.name}>
                  {item.firstName} {item.lastName ?? ""}
                </Text>
                <Text style={styles.email}>{item.email}</Text>
                <Text style={styles.role}>{item.role}</Text>
              </View>
            </View>
          </Card>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  searchbar: {
    margin: 16,
    borderRadius: 16,
    elevation: 2,
  },
  list: {
    paddingBottom: 24,
    paddingHorizontal: 12,
  },
  divider: {
    height: 8,
    backgroundColor: "transparent",
  },
  card: {
    borderRadius: 16,
    padding: 12,
    backgroundColor: "#ffffff",
    elevation: 2,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#2ecc71",
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  role: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
