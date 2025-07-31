import React from "react";
import { View } from "react-native";
import { Input, Layout, Text, Button, Spinner } from "@ui-kitten/components";
import { styles } from "../styles/editProfileStyles";

interface Props {
  form: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  loading: boolean;
  onChange: (key: keyof Props["form"], value: string) => void;
  onSubmit: () => void;
}

const EditProfileComponent = ({ onSubmit, form, loading, onChange }: Props) => {
  if (loading) {
    return (
      <Layout style={styles.loader}>
        <Spinner size="giant" />
      </Layout>
    );
  }

  return (
    <Layout style={styles.container}>
      <Text category="h5" style={styles.title}>
        Редактировать профиль
      </Text>

      <Input
        style={styles.input}
        placeholder="Имя"
        value={form.firstName}
        onChangeText={text => onChange("firstName", text)}
      />

      <Input
        style={styles.input}
        placeholder="Фамилия"
        value={form.lastName}
        onChangeText={text => onChange("lastName", text)}
      />

      <Input
        style={styles.input}
        placeholder="Телефон"
        value={form.phone}
        keyboardType="phone-pad"
        onChangeText={text => onChange("phone", text)}
      />

      <Button style={styles.saveButton} onPress={onSubmit}>
        Сохранить
      </Button>
    </Layout>
  );
};

export default EditProfileComponent;
