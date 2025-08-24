import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";
import { Gym } from "../types/Gym";
import FloatingLabelInput from "../../../../components/Input";
import Button from "../../../../components/Button";

interface Props {
  onSubmit: (data: any) => void;
  defaultValues?: Partial<Gym>;
  isEdit?: boolean;
}

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export const GymForm: React.FC<Props> = ({ onSubmit, defaultValues, isEdit }) => {
  const { control, handleSubmit } = useForm({
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
    <View style={styles.section}>
      <Text category="label" style={styles.sectionTitle}>
        Часы работы:
      </Text>
      {days.map(day => (
        <Controller
          key={day}
          name={`workingHours.${day}`}
          control={control}
          render={({ field: { onChange, value } }) => (
            <FloatingLabelInput
              label={day[0].toUpperCase() + day.slice(1)}
              placeholder="Напр. 06:00-23:00"
              value={value ?? ""}
              onChangeText={onChange}
              style={styles.input}
            />
          )}
        />
      ))}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Controller
        name="name"
        control={control}
        rules={{ required: "Обязательно" }}
        render={({ field: { onChange, value } }) => (
          <FloatingLabelInput
            label="Название"
            placeholder="Название"
            value={value}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />

      <Controller
        name="address"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FloatingLabelInput
            label="Адрес"
            placeholder="Адрес"
            value={value}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FloatingLabelInput
            label="Телефон"
            placeholder="Телефон"
            value={value}
            onChangeText={onChange}
            keyboardType="phone-pad"
            style={styles.input}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FloatingLabelInput
            label="Описание"
            placeholder="Описание"
            value={value}
            onChangeText={onChange}
            multiline
            style={styles.input}
          />
        )}
      />

      <Controller
        name="latitude"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FloatingLabelInput
            label="Широта"
            placeholder="Широта"
            value={value?.toString() ?? ""}
            keyboardType="numeric"
            onChangeText={val => onChange(parseFloat(val))}
            style={styles.input}
          />
        )}
      />

      <Controller
        name="longitude"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FloatingLabelInput
            placeholder="Долгота"
            label="Долгота"
            value={value?.toString() ?? ""}
            keyboardType="numeric"
            onChangeText={val => onChange(parseFloat(val))}
            style={styles.input}
          />
        )}
      />

      {renderWorkingHours()}

      <Button onPress={handleSubmit(data => onSubmit(cleanFormData(data)))}>{isEdit ? "Сохранить" : "Создать"}</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    gap: 15,
  },
  input: {
    marginBottom: 12,
  },
  section: {
    gap: 15,
    marginTop: 16,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  button: {
    marginTop: 24,
  },
});
