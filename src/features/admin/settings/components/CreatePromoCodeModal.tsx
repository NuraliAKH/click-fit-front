import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, Toggle } from "@ui-kitten/components";
import { useCreatePromoCode } from "../hooks/promoCodeHooks";
import { PromoCodeType } from "../types/PromoCodeType";
import UniversalModal from "../../../../components/Modal";
import FloatingLabelInput from "../../../../components/Input";
import DatePicker from "../../../../components/DatePicker";
import Button from "../../../../components/Button";

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
  const [validFrom, setValidFrom] = useState<Date>(new Date());
  const [validTo, setValidTo] = useState<Date>(new Date());
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
      validFrom,
      validTo,
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
    <UniversalModal title="Создать промокод" visible={visible} backdropStyle={styles.backdrop} onClose={onDismiss}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FloatingLabelInput label="Код" value={code} onChangeText={setCode} style={styles.input} />
        <FloatingLabelInput
          label="Тип (PERCENTAGE | FIXED | FREE_SERVICE)"
          placeholder="Тип (PERCENTAGE | FIXED | FREE_SERVICE)"
          value={type}
          onChangeText={text => setType(text as PromoCodeType)}
          style={styles.input}
        />
        <FloatingLabelInput
          label="Значение"
          placeholder="Значение"
          keyboardType="numeric"
          value={value}
          onChangeText={setValue}
          style={styles.input}
        />
        <FloatingLabelInput label="Описание" value={description} onChangeText={setDescription} style={styles.input} />
        <FloatingLabelInput
          label="Мин. сумма (тийин)"
          placeholder="Мин. сумма (тийин)"
          keyboardType="numeric"
          value={minAmount}
          onChangeText={setMinAmount}
          style={styles.input}
        />
        <FloatingLabelInput
          label="Макс. скидка (тийин)"
          placeholder="Макс. скидка (тийин)"
          keyboardType="numeric"
          value={maxDiscount}
          onChangeText={setMaxDiscount}
          style={styles.input}
        />
        <FloatingLabelInput
          label="Лимит использования"
          placeholder="Лимит использования"
          keyboardType="numeric"
          value={usageLimit}
          onChangeText={setUsageLimit}
          style={styles.input}
        />

        <DatePicker label="Срок от" value={validFrom} onChange={setValidFrom} containerStyle={styles.input} />

        <DatePicker label="Срок до" value={validTo} onChange={setValidTo} containerStyle={styles.input} />

        <View style={styles.row}>
          <Text>Активен</Text>
          <Toggle checked={isActive} onChange={setIsActive} />
        </View>

        <Button onPress={handleSubmit} disabled={isPending} style={styles.button}>
          Создать
        </Button>
      </ScrollView>
    </UniversalModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    padding: 20,
    borderRadius: 12,
    width: "100%",
    maxHeight: "90%",
  },
  scrollContainer: {
    gap: 12,
    paddingBottom: 100,
  },
  title: {
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
    marginBottom: 16,
  },
  dateButton: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginHorizontal: 4,
  },
  button: {
    marginTop: 12,
  },
});
