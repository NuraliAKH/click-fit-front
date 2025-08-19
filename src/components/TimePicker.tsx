import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Pressable, Animated, ViewStyle, TextStyle } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Text } from "@ui-kitten/components";

type Props = {
  label: string;
  value: string | null; // vaqt string ko‘rinishda saqlanadi ("HH:mm")
  onChange: (time: string) => void;

  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;

  borderColor?: string;
  focusedBorderColor?: string;
  labelBackgroundColor?: string;

  error?: string;
  placeholder?: string;
};

const TimePicker: React.FC<Props> = ({
  label,
  value,
  onChange,
  placeholder,
  containerStyle,
  labelStyle,
  borderColor = "#D0D5DD",
  focusedBorderColor = "#00B1E3",
  labelBackgroundColor = "#191A27",
  error,
}) => {
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);

  // animatsiya
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
          setVisible(true);
        }}
        style={[styles.wrap, { borderColor: borderClr }, containerStyle]}
      >
        {value ? <Text style={styles.valueText}>{value}</Text> : <Text style={styles.placeholder}>{placeholder}</Text>}

        {/* Label */}
        <Animated.Text
          pointerEvents="none"
          style={[
            styles.label,
            {
              transform: [{ translateY: labelTranslateY }],
              opacity: labelOpacity,
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

      {/* Time Picker Modal */}
      <DateTimePickerModal
        isVisible={visible}
        mode="time"
        is24Hour={true}
        textColor="#000"
        onConfirm={date => {
          const hours = date.getHours().toString().padStart(2, "0");
          const minutes = date.getMinutes().toString().padStart(2, "0");
          const formatted = `${hours}:${minutes}`;
          onChange(formatted);
          setVisible(false);
          setFocused(false);
        }}
        onCancel={() => {
          setVisible(false);
          setFocused(false);
        }}
      />

      {error && (
        <Text status="danger" category="c1" style={{ marginTop: 4 }}>
          {error}
        </Text>
      )}
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
    color: "#fff",
    fontSize: 16,
  },
  placeholder: {
    color: "#707070",
  },
  label: {
    position: "absolute",
    top: 0,
    left: 16,
    paddingHorizontal: 6,
  },
});

export default TimePicker;
