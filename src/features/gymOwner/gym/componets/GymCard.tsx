import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";
import { Gym } from "../types/Gym";

type Props = {
  gym: Gym;
  onEdit: () => void;
  onPress: () => void;
};

export const GymCard: React.FC<Props> = ({ gym, onEdit, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.card}>
        <Card.Title
          title={gym.name}
          subtitle={gym.address}
          right={() => <IconButton icon="pencil" onPress={onEdit} />}
        />
        <Card.Content>
          <Text>Категорий: {gym.services?.length || 0}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
});
