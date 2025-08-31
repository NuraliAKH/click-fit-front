import React, { useMemo, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Layout, Text, Input, ListItem, Icon, MenuItem, OverflowMenu, Button, useTheme } from "@ui-kitten/components";
import IconFA from "react-native-vector-icons/MaterialCommunityIcons";
import { useFetchAllUser } from "../../users/hooks";
import { useGiveRole } from "../hooks/roleHook";
import { Role } from "../../../../types/Roles";
import SearchInput from "../../../../components/SearchInput";

export const AssignRolePage = () => {
  const { data: userData } = useFetchAllUser();
  const { mutate: updateUserRole } = useGiveRole();

  const [search, setSearch] = useState("");
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

  const renderIcon = () => <IconFA name="account-cog" size={24} color="#8F9BB3" />;

  return (
    <Layout style={styles.container}>
      <Text category="h5" style={styles.title}>
        Назначение ролей
      </Text>

      <SearchInput placeholder="Поиск (имя, фамилия, телефон)" value={search} onChangeText={setSearch} />

      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Layout style={styles.userItem} level="2">
            <ListItem
              title={`${item.firstName} ${item.lastName}`}
              description={`Телефон: ${item.phone}  |  Роль: ${item.role}`}
              accessoryRight={() => (
                <OverflowMenu
                  anchor={() => (
                    <Button
                      appearance="ghost"
                      accessoryLeft={renderIcon}
                      onPress={() => {
                        setMenuVisible(true);
                        setSelectedUserId(item.id);
                      }}
                    />
                  )}
                  visible={menuVisible && selectedUserId === item.id}
                  onBackdropPress={() => {
                    setMenuVisible(false);
                    setSelectedUserId(null);
                  }}
                >
                  {Object.values(Role).map(role => (
                    <MenuItem
                      key={role}
                      title={role}
                      onPress={() => {
                        handleAssignRole(item.id, role);
                        setMenuVisible(false);
                      }}
                    />
                  ))}
                </OverflowMenu>
              )}
            />
          </Layout>
        )}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    gap: 12,
    flex: 1,
    padding: 16,
  },
  title: {
    color: "#00B1E3",
    marginBottom: 16,
    fontWeight: "bold",
  },
  searchInput: {
    marginBottom: 16,
  },
  userItem: {
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  list: {},
});
