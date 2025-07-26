import React from "react";
import { TextInput, Button } from "react-native-paper";
import { View, Text, ScrollView } from "react-native";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Gym } from "../types/Gym";

interface Props {
  onSubmit: (data: any) => void;
  defaultValues?: Partial<Gym>;
  isEdit?: boolean;
}

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export const GymForm: React.FC<Props> = ({ onSubmit, defaultValues, isEdit }) => {
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      name: defaultValues?.name ?? "",
      address: defaultValues?.address ?? "",
      phone: defaultValues?.phone ?? "",
      description: defaultValues?.description ?? "",
      latitude: defaultValues?.latitude ?? undefined,
      longitude: defaultValues?.longitude ?? undefined,
      workingHours: defaultValues?.workingHours ?? {},
    },
  });

  const formFields = ["name", "address", "phone", "description", "latitude", "longitude", "workingHours"];

  const cleanFormData = (data: any) => {
    const cleaned: any = {};
    formFields.forEach(field => {
      if (data[field] !== undefined) {
        cleaned[field] = data[field];
      }
    });
    return cleaned;
  };

  const renderWorkingHours = () => (
    <View style={{ marginTop: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>Часы работы:</Text>
      {days.map(day => (
        <Controller
          key={day}
          name={`workingHours.${day}`}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={day[0].toUpperCase() + day.slice(1)}
              value={value ?? ""}
              onChangeText={onChange}
              placeholder="Напр. 06:00-23:00"
              mode="outlined"
              style={{ marginBottom: 8 }}
            />
          )}
        />
      ))}
    </View>
  );

  return (
    <ScrollView style={{ padding: 16 }} keyboardShouldPersistTaps="handled">
      <Controller
        name="name"
        control={control}
        rules={{ required: "Обязательно" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Название"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            style={{ marginBottom: 8 }}
          />
        )}
      />

      <Controller
        name="address"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput label="Адрес" value={value} onChangeText={onChange} mode="outlined" style={{ marginBottom: 8 }} />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Телефон"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            style={{ marginBottom: 8 }}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Описание"
            value={value}
            onChangeText={onChange}
            multiline
            mode="outlined"
            style={{ marginBottom: 8 }}
          />
        )}
      />

      <Controller
        name="latitude"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Широта"
            value={value?.toString() ?? ""}
            keyboardType="numeric"
            onChangeText={val => onChange(parseFloat(val))}
            mode="outlined"
            style={{ marginBottom: 8 }}
          />
        )}
      />

      <Controller
        name="longitude"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Долгота"
            value={value?.toString() ?? ""}
            keyboardType="numeric"
            onChangeText={val => onChange(parseFloat(val))}
            mode="outlined"
            style={{ marginBottom: 8 }}
          />
        )}
      />

      {renderWorkingHours()}

      <Button
        mode="contained"
        onPress={handleSubmit(data => onSubmit(cleanFormData(data)))}
        style={{ marginTop: 24, marginBottom: 16 }}
      >
        {isEdit ? "Сохранить" : "Создать"}
      </Button>
    </ScrollView>
  );
};
