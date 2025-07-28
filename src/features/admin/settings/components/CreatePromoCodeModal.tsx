import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Modal, Portal, Text, Button, TextInput, Switch } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import { useCreatePromoCode } from "../hooks/promoCodeHooks";
import { PromoCodeType } from "../types/PromoCodeType";

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

export const CreatePromoCodeModal: React.FC<Props> = ({ visible, onDismiss }) => {
  const [code, setCode] = useState("");
  const [type, setType] = useState<PromoCodeType>(PromoCodeType.PERCENTAGE);
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxDiscount, setMaxDiscount] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [validFrom, setValidFrom] = useState<Date | undefined>(new Date());
  const [validTo, setValidTo] = useState<Date | undefined>(new Date());
  const [isActive, setIsActive] = useState(true);

  const { mutate, isPending } = useCreatePromoCode();

  const handleSubmit = () => {
    mutate({
      code,
      type,
      value: Number(value),
      description,
      minAmount: minAmount ? Number(minAmount) : null,
      maxDiscount: maxDiscount ? Number(maxDiscount) : null,
      usageLimit: usageLimit ? Number(usageLimit) : null,
      validFrom: validFrom!,
      validTo: validTo!,
      isActive,
    });
    onDismiss();
    resetForm();
  };

  const resetForm = () => {
    setCode("");
    setType(PromoCodeType.PERCENTAGE);
    setValue("");
    setDescription("");
    setMinAmount("");
    setMaxDiscount("");
    setUsageLimit("");
    setValidFrom(new Date());
    setValidTo(new Date());
    setIsActive(true);
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
        <ScrollView style={{ maxHeight: 600 }}>
          <Text style={styles.title}>Создать промокод</Text>
          <TextInput label="Код" value={code} onChangeText={setCode} style={styles.input} />
          <TextInput
            label="Тип (PERCENTAGE | FIXED | FREE_SERVICE)"
            value={type}
            onChangeText={text => setType(text as PromoCodeType)}
            style={styles.input}
          />
          <TextInput
            label="Значение"
            keyboardType="numeric"
            value={value}
            onChangeText={setValue}
            style={styles.input}
          />
          <TextInput label="Описание" value={description} onChangeText={setDescription} style={styles.input} />
          <TextInput
            label="Мин. сумма (тийин)"
            keyboardType="numeric"
            value={minAmount}
            onChangeText={setMinAmount}
            style={styles.input}
          />
          <TextInput
            label="Макс. скидка (тийин)"
            keyboardType="numeric"
            value={maxDiscount}
            onChangeText={setMaxDiscount}
            style={styles.input}
          />
          <TextInput
            label="Лимит использования"
            keyboardType="numeric"
            value={usageLimit}
            onChangeText={setUsageLimit}
            style={styles.input}
          />
          <View style={styles.row}>
            <DatePickerInput
              locale="ru"
              label="Срок от"
              value={validFrom}
              onChange={setValidFrom}
              inputMode="start"
              style={styles.date}
            />
            <DatePickerInput
              locale="ru"
              label="до"
              value={validTo}
              onChange={setValidTo}
              inputMode="end"
              style={styles.date}
            />
          </View>
          <View style={styles.row}>
            <Text>Активен</Text>
            <Switch value={isActive} onValueChange={setIsActive} />
          </View>
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isPending}
            disabled={isPending}
            style={styles.button}
          >
            Создать
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 12,
    padding: 20,
    maxHeight: "90%",
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  date: {
    flex: 1,
  },
  button: {
    marginTop: 12,
  },
});
