import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Text, useTheme, HelperText } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/RootStackParamList";
import Button from "../../../components/Button";
import FloatingLabelInput from "../../../components/Input";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginPage = () => {
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
        <Text style={[styles.title, { color: "#00B1E3" }]}>Welcome to {"\n"} CLICK-FIT</Text>

        <View style={styles.form}>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <FloatingLabelInput
                  label="Email"
                  value={value}
                  onChangeText={onChange}
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
                <FloatingLabelInput
                  label="Password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  style={styles.input}
                  placeholder="Enter your password"
                />
                {errors.password && <HelperText type="error">{errors.password.message}</HelperText>}
              </>
            )}
          />
          <Button onPress={handleSubmit(onSubmit)} style={styles.button}>
            Login
          </Button>
        </View>
      </View>
      <Button type="ghost" onPress={() => navigation.navigate("Register" as never)} style={{ marginTop: 12 }}>
        Don’t have an account? Register
      </Button>
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
    fontSize: 32,
    color: "#00B1E3",
    fontWeight: "700",
    marginBottom: 40,
    textAlign: "center",
    overflow: "hidden",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 32,
    textAlign: "center",
  },
  form: {
    gap: 10,
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
