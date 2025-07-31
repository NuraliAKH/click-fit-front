import React from "react";
import { View, StyleSheet } from "react-native";
import { useController, Control } from "react-hook-form";
import { Input, Text } from "@ui-kitten/components";

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

type Props = {
  control: Control<any>;
  name: string;
};

export const GymWorkingHoursField: React.FC<Props> = ({ control, name }) => {
  const {
    field: { value, onChange },
  } = useController({ control, name });

  const updateDay = (day: string, hours: string) => {
    onChange({
      ...value,
      [day]: hours,
    });
  };

  return (
    <View style={styles.container}>
      <Text category="label" style={styles.label}>
        Часы работы:
      </Text>
      {days.map(day => (
        <Input
          key={day}
          label={day[0].toUpperCase() + day.slice(1)}
          value={value?.[day] ?? ""}
          onChangeText={text => updateDay(day, text)}
          placeholder="Напр. 06:00-23:00"
          style={styles.input}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    marginBottom: 12,
  },
});
