import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform, Image } from "react-native";
import { Text, useTheme, HelperText } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Button from "../../../components/Button";
import FloatingLabelInput from "../../../components/Input";

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
        <Text style={[styles.title, { color: "#00B1E3" }]}>Welcome back {"\n"}to CLICK-FIT</Text>
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
                  placeholder="Input your email"
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
                <FloatingLabelInput
                  label="Phone"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                  placeholder="Input your phone number"
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
                <FloatingLabelInput
                  label="Password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  placeholder="Input password"
                />
                {errors.password && <HelperText type="error">{errors.password.message}</HelperText>}
              </>
            )}
          />

          <Button onPress={handleSubmit(onSubmit)} style={styles.button}>
            Register
          </Button>
          <Text style={styles.orText}>Or Sign Up using</Text>
          <View style={{ flexDirection: "row", justifyContent: "center", gap: 45, marginTop: 8 }}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../../../assets/auth-icons/click.png")}
              alt="click"
            />
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../../../assets/auth-icons/google.png")}
              alt="google"
            />
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../../../assets/auth-icons/facebook.png")}
              alt="facebook"
            />
          </View>
        </View>
      </View>
      <Button type="ghost" onPress={() => navigation.navigate("Login")} style={{ marginTop: 12 }}>
        Already have an account? Login
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
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
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

  button: {
    marginTop: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },

  orText: {
    marginTop: 16,
    textAlign: "center",
    color: "#6B7280",
    fontSize: 14,
  },
});

export default RegisterPage;
