import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Text, Toggle, Button } from "@ui-kitten/components";
import { useCreateService, useUpdateService } from "../hooks/service.hook";
import { useFetchAllCategory } from "../hooks/categories.hook";
import MyButton from "../../../../components/Button";

import FloatingLabelInput from "../../../../components/Input";

type Props = {
  gymId: number;
  initialValues?: any;
  onSuccess: () => void;
};

export const ServiceForm: React.FC<Props> = ({ gymId, initialValues, onSuccess }) => {
  const isEdit = !!initialValues;
  const create = useCreateService();
  const update = useUpdateService(initialValues?.id);
  const { data: categories } = useFetchAllCategory();

  const { control, handleSubmit, setValue, getValues } = useForm({
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

    isEdit ? await update.mutateAsync(payload) : await create.mutateAsync(payload);
    onSuccess();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <FloatingLabelInput
            label="Название"
            value={value}
            onChangeText={onChange}
            style={styles.input}
            placeholder="Введите название"
          />
        )}
      />
      <Controller
        control={control}
        name="price"
        render={({ field: { onChange, value } }) => (
          <FloatingLabelInput
            label="Цена (в тийинах)"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
            style={styles.input}
            placeholder="Например, 100000"
          />
        )}
      />
      <Controller
        control={control}
        name="durationMinutes"
        render={({ field: { onChange, value } }) => (
          <FloatingLabelInput
            label="Длительность (мин)"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
            style={styles.input}
            placeholder="Например, 60"
          />
        )}
      />
      <Controller
        control={control}
        name="capacity"
        render={({ field: { onChange, value } }) => (
          <FloatingLabelInput
            label="Вместимость (людей)"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
            style={styles.input}
            placeholder="Например, 10"
          />
        )}
      />

      {/* Категории */}
      <View style={styles.categorySection}>
        <Text category="label" style={styles.label}>
          Категория
        </Text>
        <View style={styles.chipWrap}>
          {categories?.data?.map((cat: any) => (
            <Button
              key={cat.id}
              size="tiny"
              appearance={getValues("categoryId") === cat.id ? "filled" : "outline"}
              status={getValues("categoryId") === cat.id ? "info" : "basic"}
              onPress={() => setValue("categoryId", cat.id)}
              style={styles.chip}
            >
              {cat.name}
            </Button>
          ))}
        </View>
      </View>

      {/* Переключатель активности */}
      <Controller
        control={control}
        name="isActive"
        render={({ field: { value, onChange } }) => (
          <View style={styles.switchRow}>
            <Text>Активен</Text>
            <Toggle checked={value} onChange={onChange} />
          </View>
        )}
      />

      <MyButton style={styles.submit} onPress={handleSubmit(onSubmit)}>
        {isEdit ? "Сохранить изменения" : "Создать услугу"}
      </MyButton>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: "transparent",
    gap: 15,
  },
  input: {
    marginBottom: 12,
  },
  submit: {
    marginTop: 24,
  },
  label: {
    marginBottom: 8,
    fontWeight: "600",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  categorySection: {
    marginVertical: 12,
  },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
});
