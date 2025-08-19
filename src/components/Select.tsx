import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Pressable, Animated, FlatList, Modal, View, Text, ViewStyle, TextStyle } from "react-native";

export type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  value: string | null;
  onChange: (val: string) => void;
  options: Option[];

  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;

  borderColor?: string;
  focusedBorderColor?: string;
  labelBackgroundColor?: string;

  left?: React.ReactNode;
  right?: React.ReactNode;
};

const FloatingLabelSelect: React.FC<Props> = ({
  label,
  value,
  onChange,
  options,
  containerStyle,
  inputStyle,
  labelStyle,
  borderColor = "#D0D5DD",
  focusedBorderColor = "#00B1E3",
  labelBackgroundColor = "#191A27",
  left,
  right,
}) => {
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);

  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: focused || !!value ? 1 : 0,
      duration: 160,
      useNativeDriver: true,
    }).start();
  }, [focused, value, anim]);

  const borderClr = focused ? focusedBorderColor : borderColor;

  const labelTranslateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  const labelOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <>
      <Pressable
        onPress={() => {
          setFocused(true);
          setOpen(true);
        }}
        style={[styles.wrap, { borderColor: borderClr }, containerStyle]}
      >
        {/* Value */}
        <Text style={[styles.valueText, { color: value ? "#fff" : "#A1A1AA" }, inputStyle]} numberOfLines={1}>
          {options.find(o => o.value === value)?.label || label}
        </Text>

        {/* Floating Label */}
        <Animated.Text
          pointerEvents="none"
          style={[
            styles.label,
            {
              transform: [{ translateY: labelTranslateY }],
              opacity: labelOpacity,
              left: 16,
              color: "#00B1E3",
              backgroundColor: labelBackgroundColor,
            },
            labelStyle,
          ]}
          numberOfLines={1}
        >
          {label}
        </Animated.Text>
      </Pressable>

      {/* Dropdown Modal */}
      <Modal transparent visible={open} animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.dropdown}>
            <FlatList
              data={options}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <Pressable
                  style={[styles.option, item.value === value && { backgroundColor: "#00B1E310" }]}
                  onPress={() => {
                    onChange(item.value);
                    setOpen(false);
                    setFocused(false);
                  }}
                >
                  <Text style={[styles.optionText, item.value === value && { color: "#00B1E3" }]}>{item.label}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  valueText: {
    fontSize: 16,
  },
  label: {
    position: "absolute",
    top: 0,
    paddingHorizontal: 6,
    fontSize: 12,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 20,
  },
  dropdown: {
    backgroundColor: "#191A27",
    borderRadius: 12,
    paddingVertical: 8,
    maxHeight: 300,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default FloatingLabelSelect;
