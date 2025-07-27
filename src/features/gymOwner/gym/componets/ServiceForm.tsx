import React from "react";
import { View, StyleSheet, Switch } from "react-native";
import { Button, TextInput, HelperText, Text } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { useCreateService, useUpdateService } from "../hooks/service.hook";
import { useFetchAllCategory } from "../hooks/categories.hook";

type Props = {
  gymId: number;
  initialValues?: any;
  onSuccess: () => void;
};

export const ServiceForm: React.FC<Props> = ({ gymId, initialValues, onSuccess }) => {
  const isEdit = !!initialValues;

  const create = useCreateService();
  const update = useUpdateService(initialValues?.id);
  const { data: categories = [] } = useFetchAllCategory(); // ← категория списка

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: initialValues?.name || "",
      price: initialValues?.price?.toString() || "",
      durationMinutes: initialValues?.durationMinutes?.toString() || "",
      capacity: initialValues?.capacity?.toString() || "",
      categoryId: initialValues?.categoryId || null,
      isActive: initialValues?.isActive ?? true,
    },
  });

  const onSubmit = async (values: any) => {
    const payload = {
      name: values.name,
      price: parseInt(values.price),
      durationMinutes: parseInt(values.durationMinutes),
      capacity: parseInt(values.capacity),
      categoryId: values.categoryId,
      isActive: values.isActive,
      gymId,
    };

    if (isEdit) {
      await update.mutateAsync(payload);
    } else {
      await create.mutateAsync(payload);
    }

    onSuccess();
  };

  return (
    <View>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput label="Название" value={value} onChangeText={onChange} style={styles.input} />
        )}
      />
      <Controller
        control={control}
        name="price"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Цена (в тийинах)"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
            style={styles.input}
          />
        )}
      />
      <Controller
        control={control}
        name="durationMinutes"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Длительность (мин)"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
            style={styles.input}
          />
        )}
      />
      <Controller
        control={control}
        name="capacity"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Вместимость (людей)"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
            style={styles.input}
          />
        )}
      />

      {/* Select Category */}
      <Controller
        control={control}
        name="categoryId"
        render={({ field: { onChange, value } }) => (
          <View style={styles.input}>
            <Text style={{ marginBottom: 4 }}>Категория</Text>
            {categories.map((cat: any) => (
              <Button
                key={cat.id}
                mode={value === cat.id ? "contained" : "outlined"}
                onPress={() => onChange(cat.id)}
                style={{ marginBottom: 4 }}
              >
                {cat.name}
              </Button>
            ))}
          </View>
        )}
      />

      {/* isActive Switch */}
      <Controller
        control={control}
        name="isActive"
        render={({ field: { onChange, value } }) => (
          <View style={[styles.input, styles.switchRow]}>
            <Text>Активен</Text>
            <Switch value={value} onValueChange={onChange} />
          </View>
        )}
      />

      <Button mode="contained" onPress={handleSubmit(onSubmit)} style={{ marginTop: 16 }}>
        {isEdit ? "Сохранить изменения" : "Создать услугу"}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
