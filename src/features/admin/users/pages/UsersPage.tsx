import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Avatar, Input, Card, Text, Divider } from "@ui-kitten/components";
import { useFetchAllUser } from "../hooks";
import Icon from "react-native-vector-icons/Feather";
import FloatingLabelInput from "../../../../components/Input";
import SearchInput from "../../../../components/SearchInput";

export const UsersListPage = () => {
  const { data, isLoading, isError } = useFetchAllUser();
  const [searchText, setSearchText] = useState("");

  const filteredUsers = data?.data.filter((user: any) =>
    `${user.firstName} ${user.lastName ?? ""} ${user.email}`.toLowerCase().includes(searchText.toLowerCase())
  );

  if (isLoading || !data) {
    return (
      <View style={styles.centered}>
        <Text category="h6">Загрузка...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text status="danger">Ошибка при загрузке пользователей</Text>
      </View>
    );
  }

  const renderItem = ({ item }: any) => (
    <Card style={styles.card} disabled>
      <View style={styles.userRow}>
        <View
          style={[
            styles.avatar,
            { width: 48, height: 48, borderRadius: 24, justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
            {`${item.firstName?.[0] ?? ""}${item.lastName?.[0] ?? ""}`}
          </Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.name}>
            {item.firstName} {item.lastName ?? ""}
          </Text>
          <Text appearance="hint" style={styles.email}>
            {item.email}
          </Text>
          <Text appearance="hint" style={styles.role}>
            {item.role}
          </Text>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <SearchInput placeholder="Поиск по имени, фамилии или email" value={searchText} onChangeText={setSearchText} />
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    gap: 12,
  },
  searchbar: {
    margin: 16,
    borderRadius: 16,
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
    backgroundColor: "#transparent",
    borderColor: "#00B1E3",
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 16,
    backgroundColor: "#2ecc71",
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  email: {
    fontSize: 14,
    marginTop: 2,
  },
  role: {
    fontSize: 12,
    marginTop: 2,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
