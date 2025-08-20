import React from "react";
import { Layout, Spinner } from "@ui-kitten/components";
import { styles } from "../styles/editProfileStyles";
import FloatingLabelInput from "../../../../components/Input";
import Button from "../../../../components/Button";

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
      <FloatingLabelInput
        label="Firts Name"
        style={styles.input}
        placeholder="Input first name"
        value={form.firstName}
        onChangeText={text => onChange("firstName", text)}
      />

      <FloatingLabelInput
        label="Last Name"
        style={styles.input}
        placeholder="Input Last Name"
        value={form.lastName}
        onChangeText={text => onChange("lastName", text)}
      />

      <FloatingLabelInput
        label="Phone Number"
        style={styles.input}
        placeholder="Input Phone Number"
        value={form.phone}
        keyboardType="phone-pad"
        onChangeText={text => onChange("phone", text)}
      />

      <Button style={styles.saveButton} onPress={onSubmit}>
        Save
      </Button>
    </Layout>
  );
};

export default EditProfileComponent;
