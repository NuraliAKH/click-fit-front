import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Modal, Layout, Text, Input, Button, Toggle, useTheme } from "@ui-kitten/components";
import { Datepicker } from "@ui-kitten/components";
import { useCreatePromoCode } from "../hooks/promoCodeHooks";
import { PromoCodeType } from "../types/PromoCodeType";

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

export const CreatePromoCodeModal: React.FC<Props> = ({ visible, onDismiss }) => {
  const theme = useTheme();
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
    <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={onDismiss}>
      <Layout style={styles.container} level="1">
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <Text category="h6" style={styles.title}>
            Создать промокод
          </Text>
          <Input label="Код" value={code} onChangeText={setCode} style={styles.input} />
          <Input
            label="Тип (PERCENTAGE | FIXED | FREE_SERVICE)"
            value={type}
            onChangeText={text => setType(text as PromoCodeType)}
            style={styles.input}
          />
          <Input label="Значение" keyboardType="numeric" value={value} onChangeText={setValue} style={styles.input} />
          <Input label="Описание" value={description} onChangeText={setDescription} style={styles.input} />
          <Input
            label="Мин. сумма (тийин)"
            keyboardType="numeric"
            value={minAmount}
            onChangeText={setMinAmount}
            style={styles.input}
          />
          <Input
            label="Макс. скидка (тийин)"
            keyboardType="numeric"
            value={maxDiscount}
            onChangeText={setMaxDiscount}
            style={styles.input}
          />
          <Input
            label="Лимит использования"
            keyboardType="numeric"
            value={usageLimit}
            onChangeText={setUsageLimit}
            style={styles.input}
          />

          <View style={styles.row}>
            <Datepicker date={validFrom} onSelect={setValidFrom} style={styles.date} placeholder="Срок от" />
            <Datepicker date={validTo} onSelect={setValidTo} style={styles.date} placeholder="до" />
          </View>

          <View style={styles.row}>
            <Text>Активен</Text>
            <Toggle checked={isActive} onChange={checked => setIsActive(checked)} />
          </View>

          <Button onPress={handleSubmit} disabled={isPending} style={styles.button}>
            Создать
          </Button>
        </ScrollView>
      </Layout>
    </Modal>
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
