import React, { useMemo, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text, TextInput, List, IconButton, Button, Menu } from "react-native-paper";
import { useFetchAllUser } from "../../users/hooks";
import { useGiveRole } from "../hooks/roleHook";
import { Role } from "../../../../types/Roles";

export const AssignRolePage = () => {
  const { data: userData } = useFetchAllUser();
  const { mutate: updateUserRole } = useGiveRole();

  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const filteredUsers = useMemo(() => {
    if (!userData?.data) return [];
    return userData.data.filter((user: any) =>
      [user.firstName, user.lastName, user.phone].join(" ").toLowerCase().includes(search.toLowerCase())
    );
  }, [search, userData]);
  const handleAssignRole = (userId: number, role: string) => {
    updateUserRole({ userId: +userId, role });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Назначение ролей</Text>

      <TextInput
        label="Поиск (имя, фамилия, телефон)"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
        mode="outlined"
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <List.Item
              title={`${item.firstName} ${item.lastName}`}
              description={`Телефон: ${item.phone}  |  Роль: ${item.role}`}
              right={() => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Menu
                    visible={menuVisible && selectedUserId === item.id}
                    onDismiss={() => {
                      setMenuVisible(false);
                      setSelectedUserId(null);
                    }}
                    anchor={
                      <IconButton
                        icon="account-cog"
                        onPress={() => {
                          setMenuVisible(true);
                          setSelectedUserId(item.id);
                        }}
                      />
                    }
                  >
                    {Object.values(Role).map(role => (
                      <Menu.Item
                        key={role}
                        onPress={() => {
                          handleAssignRole(item.id, role);
                          setMenuVisible(false);
                        }}
                        title={role}
                      />
                    ))}
                  </Menu>
                </View>
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    marginBottom: 12,
    fontWeight: "bold",
  },
  searchInput: {
    marginBottom: 16,
  },
  userItem: {
    backgroundColor: "#f7f7f7",
    borderRadius: 12,
    marginBottom: 10,
    overflow: "hidden",
  },
  list: {
    paddingBottom: 20,
  },
});
