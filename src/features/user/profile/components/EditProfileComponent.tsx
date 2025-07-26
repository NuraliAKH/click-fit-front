import React from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { styles } from "../styles/editProfileStyles";

interface Props {
  form: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  loading: boolean;
  onChange: (key: keyof Props["form"], value: string) => void;
  onSubmit: any;
}

const EditProfileComponent = ({ onSubmit, form, loading, onChange }: Props) => {
  if (loading) {
    return <ActivityIndicator style={{ marginTop: 100 }} size="large" color="#0EA5E9" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Редактировать профиль</Text>

      <TextInput
        style={styles.input}
        placeholder="Имя"
        value={form.firstName}
        onChangeText={text => onChange("firstName", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Фамилия"
        value={form.lastName}
        onChangeText={text => onChange("lastName", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Телефон"
        value={form.phone}
        onChangeText={text => onChange("phone", text)}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.saveButton} onPress={onSubmit}>
        <Text style={styles.saveButtonText}>Сохранить</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileComponent;
