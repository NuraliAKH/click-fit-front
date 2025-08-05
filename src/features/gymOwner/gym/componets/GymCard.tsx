import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text, Card } from "@ui-kitten/components";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Gym } from "../types/Gym";

type Props = {
  gym: Gym;
  onEdit: () => void;
  onPress: () => void;
};

export const GymCard: React.FC<Props> = ({ gym, onEdit, onPress }) => {
  const EditIcon = () => (
    <TouchableOpacity onPress={onEdit}>
      <MaterialIcons name="edit" size={20} color="#8F9BB3" />
    </TouchableOpacity>
  );

  const mainImage = gym.images?.find(img => img.isMain)?.url;

  return (
    <Card style={styles.card}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.row}>
          {mainImage ? (
            <Image source={{ uri: mainImage }} style={styles.avatar} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>🏋️‍♂️</Text>
            </View>
          )}

          <View style={styles.info}>
            <View style={styles.header}>
              <View style={{ flex: 1 }}>
                <Text category="h6">{gym.name}</Text>
                <Text appearance="hint" category="s2">
                  {gym.address}
                </Text>
              </View>
              <EditIcon />
            </View>
            <Text>Категорий: {gym.services?.length || 0}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
    backgroundColor: "#e0e0e0",
  },
  placeholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F7F9FC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  placeholderText: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
  },
});
