// components/SearchInput.tsx
import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  loading?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
} & Omit<TextInputProps, "style" | "onChangeText" | "value" | "placeholder">;

const SearchInput: React.FC<Props> = ({
  value,
  onChangeText,
  placeholder = "Search…",
  onClear,
  loading = false,
  containerStyle,
  inputStyle,
  ...textInputProps
}) => {
  const handleClear = () => {
    onClear?.();
    onChangeText("");
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Ionicons name="search" size={20} style={styles.leftIcon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        style={[styles.input, inputStyle]}
        returnKeyType="search"
        {...textInputProps}
      />
      {loading ? (
        <ActivityIndicator style={styles.right} />
      ) : value?.length ? (
        <TouchableOpacity
          onPress={handleClear}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.clearBtn}
        >
          <Ionicons name="close-circle" size={18} color="#E5E7EB" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "90%",
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  leftIcon: {
    color: "#E5E7EB",
    marginRight: 8,
  },
  input: {
    color: "#fff",
    flex: 1,
    height: 50,
    paddingVertical: 0,
    fontSize: 16,
  },
  right: {},
  clearBtn: {
    marginLeft: 8,
  },
});

export default SearchInput;
