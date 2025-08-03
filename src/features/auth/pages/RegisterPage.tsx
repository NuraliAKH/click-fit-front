import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Text, TextInput, Button, useTheme, HelperText } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

const registerSchema = z.object({
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Phone is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterForm = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await axios.post("http://192.168.1.177:3000/api/auth/signup", data);
      Toast.show({ type: "success", text1: "Registered successfully" });
      navigation.navigate("Login");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Registration failed",
        text2: error.response?.data?.message || "Try again later",
      });
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
      <View style={styles.inner}>
        <Text style={[styles.title, { color: colors.primary }]}>Register 📝</Text>
        <Text style={styles.subtitle}>Create a new account</Text>
        <View style={styles.form}>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  label="Email"
                  value={value}
                  onChangeText={onChange}
                  mode="outlined"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={styles.input}
                />
                {errors.email && <HelperText type="error">{errors.email.message}</HelperText>}
              </>
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  label="Phone"
                  value={value}
                  onChangeText={onChange}
                  mode="outlined"
                  keyboardType="phone-pad"
                  style={styles.input}
                />
                {errors.phone && <HelperText type="error">{errors.phone.message}</HelperText>}
              </>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  label="Password"
                  value={value}
                  onChangeText={onChange}
                  mode="outlined"
                  secureTextEntry
                  style={styles.input}
                />
                {errors.password && <HelperText type="error">{errors.password.message}</HelperText>}
              </>
            )}
          />

          <Button mode="contained" onPress={handleSubmit(onSubmit)} loading={isSubmitting} style={styles.button}>
            Register
          </Button>

          <Button mode="text" onPress={() => navigation.navigate("Login")} style={{ marginTop: 8 }}>
            Already have an account? Login
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 32,
    textAlign: "center",
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: "white",
  },
  button: {
    marginTop: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
});

export default RegisterPage;
