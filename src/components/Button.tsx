// components/Button.tsx
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  StyleProp,
  StyleSheet as RNStyleSheet,
} from "react-native";

type ButtonType = "primary" | "default" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  type?: ButtonType;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onPress, style, textStyle, type = "primary", disabled = false }) => {
  // Flatten incoming style and strip any radius so we can hard-lock 25
  const flat = RNStyleSheet.flatten(style) || {};
  const {
    borderRadius: _br,
    borderTopLeftRadius: _tlr,
    borderTopRightRadius: _trr,
    borderBottomLeftRadius: _blr,
    borderBottomRightRadius: _brr,
    ...restStyle
  } = flat;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.base,
        type === "primary" && styles.primary,
        type === "default" && styles.default,
        type === "ghost" && styles.ghost,
        disabled && styles.disabled,
        restStyle,
        styles.lockRadius,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.textBase,
          type === "primary" && styles.textPrimary,
          type === "default" && styles.textDefault,
          type === "ghost" && styles.textGhost,
          disabled && styles.textDisabled,
          textStyle,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    overflow: "hidden",
  },
  primary: {
    backgroundColor: "#00B1E3",
  },
  default: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d9d9d9",
  },
  ghost: {
    backgroundColor: "transparent",
  },
  disabled: {
    backgroundColor: "#f5f5f5",
    borderColor: "#d9d9d9",
  },
  textBase: {
    fontSize: 16,
    fontWeight: "500",
  },
  textPrimary: {
    color: "#fff",
  },
  textDefault: {
    color: "rgba(0,0,0,0.85)",
  },
  textGhost: {
    color: "#00B1E3",
  },
  textDisabled: {
    color: "rgba(0,0,0,0.25)",
  },
  lockRadius: {
    borderRadius: 25,
  },
});

export default Button;
