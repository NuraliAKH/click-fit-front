import React from "react";
import { Card, Text, IconButton, useTheme } from "react-native-paper";
import { View } from "react-native";
import { Gym } from "../types/Gym";
interface Props {
  gym: Gym;
  onEdit: () => void;
}

export const GymCard: React.FC<Props> = ({ gym, onEdit }) => {
  const theme = useTheme();

  return (
    <Card style={{ marginBottom: 12 }}>
      <Card.Title
        title={gym.name}
        subtitle={gym.address}
        right={props => <IconButton icon="pencil" onPress={onEdit} {...props} />}
      />
      <Card.Content>
        <Text>{gym.description}</Text>
        <View style={{ marginTop: 8 }}>
          <Text>📞 {gym.phone}</Text>
          <Text>
            📍 {gym.latitude}, {gym.longitude}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};
