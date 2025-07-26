import React from "react";
import { View, Text } from "react-native";
import { useController, Control } from "react-hook-form";
import { TextInput } from "react-native-paper";

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
    <View style={{ gap: 8 }}>
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>Часы работы:</Text>
      {days.map(day => (
        <TextInput
          key={day}
          label={day[0].toUpperCase() + day.slice(1)}
          value={value?.[day] ?? ""}
          onChangeText={text => updateDay(day, text)}
          mode="outlined"
        />
      ))}
    </View>
  );
};
