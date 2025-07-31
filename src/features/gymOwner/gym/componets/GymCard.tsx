import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
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

  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        style={styles.card}
        header={() => (
          <View style={styles.header}>
            <View>
              <Text category="h6">{gym.name}</Text>
              <Text appearance="hint" category="s2">
                {gym.address}
              </Text>
            </View>
            <EditIcon />
          </View>
        )}
      >
        <Text>Категорий: {gym.services?.length || 0}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
  },
});
