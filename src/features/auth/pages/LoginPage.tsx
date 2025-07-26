import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Button, Text, TextInput, useTheme, HelperText } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/RootStackParamList";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await axios.post("http://192.168.1.177:3000/api/auth/signin", data);

      const token = response.data?.access_token;

      if (!token) {
        Toast.show({ type: "error", text1: "Login failed", text2: "Token not found in response" });
        return;
      }

      await AsyncStorage.setItem("token", token);
      Toast.show({ type: "success", text1: "Login successful" });

      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "UserLayout" as never }],
        });
      }, 200);
    } catch (error: any) {
      console.error("Login error:", error);
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: error.response?.data?.message || "Check your credentials or try again later",
      });
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
      <View style={styles.inner}>
        <Text style={[styles.title, { color: colors.primary }]}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>Login to your account</Text>
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
            Login
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

export default LoginPage;
