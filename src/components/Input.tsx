// Input.tsx
import React, { useState, useEffect } from "react";
import { View, TextInput, Animated, StyleSheet, TextInputProps, TextStyle, ViewStyle } from "react-native";

interface InputProps extends TextInputProps {
  label: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

const Input: React.FC<InputProps> = ({ label, value, onChangeText, containerStyle, inputStyle, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelAnim = new Animated.Value(value ? 1 : 0);

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: "absolute" as const,
    left: 20,
    top: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [14, -8], // center → top
    }),
    fontSize: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12], // bigger when centered, smaller when floated
    }),
    color: "#999",
    backgroundColor: "transparent",
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingTop: 8,
    color: "#000",
  },
});

export default Input;
