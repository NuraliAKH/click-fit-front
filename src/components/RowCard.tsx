import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Card, Text } from "@ui-kitten/components";
import Icon from "react-native-vector-icons/Feather";

interface RowCardProps {
  title: string;
  sub1?: string;
  sub2?: string;
  image?: string;
  onPress?: () => void;
  onActionPress?: () => void;
  actionIcon?: string; // e.g., "heart", "edit", "trash"
  actionDisabled?: boolean;
  borderColor?: string;
}

const RowCard: React.FC<RowCardProps> = ({
  title,
  sub1,
  sub2,
  image,
  onPress,
  onActionPress,
  actionIcon = "heart",
  actionDisabled = false,
  borderColor = "#00B1E3",
}) => {
  return (
    <Card style={[styles.card, { borderColor }]} onPress={onPress}>
      <View style={styles.container}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <View style={styles.textContainer}>
          <Text category="h6" numberOfLines={1}>
            {title}
          </Text>
          {sub1 && (
            <Text appearance="hint" category="s2" numberOfLines={1}>
              {sub1}
            </Text>
          )}
          {sub2 && (
            <Text appearance="hint" category="s3" numberOfLines={1}>
              {sub2}
            </Text>
          )}
        </View>
        {onActionPress && (
          <TouchableOpacity onPress={onActionPress} style={styles.actionButton} disabled={actionDisabled}>
            <Icon name={actionIcon} size={24} color="#ccc" />
          </TouchableOpacity>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderRadius: 15,
    padding: 0,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  actionButton: {
    padding: 8,
  },
});

export default RowCard;
