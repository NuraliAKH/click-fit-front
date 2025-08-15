import React, { useEffect, useMemo, useRef, useState } from "react";
import { TextInput, TextInputProps, StyleSheet, Pressable, Animated, ViewStyle, TextStyle } from "react-native";

type Props = Omit<TextInputProps, "onChange"> & {
  label: string;
  value: string;
  onChangeText: (text: string) => void;

  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;

  borderColor?: string;
  focusedBorderColor?: string;

  /**
   * Патчик под лейблом, чтобы бордер не “резал” текст.
   * Поставь цвет фона экрана (по умолчанию #fff). Если хочешь, чтобы
   * бордер проходил прямо через текст — задай 'transparent'.
   */
  labelBackgroundColor?: string;

  left?: React.ReactNode;
  right?: React.ReactNode;
};

const FloatingLabelInput: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  containerStyle,
  inputStyle,
  labelStyle,
  borderColor = "#D0D5DD",
  focusedBorderColor = "#00B1E3",
  labelBackgroundColor = "",
  left,
  right,
  onFocus,
  onBlur,
  ...rest
}) => {
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);

  // 0 -> не в фокусе и пусто; 1 -> в фокусе ИЛИ есть значение
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: focused || !!value ? 1 : 0,
      duration: 160,
      useNativeDriver: true,
    }).start();
  }, [focused, value, anim]);

  const borderClr = focused ? focusedBorderColor : borderColor;

  // Лейбл “сидит” на бордере сверху слева
  const labelTranslateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8], // подними выше, чтобы оказаться на линии бордера
  });

  const labelOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Pressable
      onPress={() => inputRef.current?.focus()}
      style={[styles.wrap, { borderColor: borderClr }, containerStyle]}
    >
      {/* Сам инпут */}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#000"
        onFocus={e => {
          setFocused(true);
          onFocus?.(e);
        }}
        style={{ color: "#fff" }}
        onBlur={e => {
          setFocused(false);
          onBlur?.(e);
        }}
      />

      <Animated.View
        pointerEvents="none"
        style={[
          styles.labelPatch,
          {
            backgroundColor: labelBackgroundColor,
            transform: [{ translateY: labelTranslateY }],
            opacity: labelOpacity,
            left: left ? 36 : 16,
            zIndex: -1, // 👈 чтобы не перекрывал TextInput
          },
        ]}
      />

      <Animated.Text
        pointerEvents="none"
        style={[
          styles.label,
          {
            transform: [{ translateY: labelTranslateY }],
            opacity: labelOpacity,
            left: 16,
            color: "#00B1E3",
            backgroundColor: "#191A27",
            zIndex: -1, // 👈 чтобы не перекрывал клики и ввод
          },
          labelStyle,
        ]}
        numberOfLines={1}
      >
        {label}
      </Animated.Text>
    </Pressable>
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
  input: {
    height: 50,
    paddingVertical: 0, // убираем системный вертикальный отступ
    backgroundColor: "transparent",
    color: "#fff",
    fontSize: 16,
  },
  label: {
    position: "absolute",
    top: 0, // отталкиваемся от верхней границы (анимация переводит вверх)
    paddingHorizontal: 6,
  },
  labelPatch: {
    position: "absolute",
    top: 0,
    height: 12,
    borderRadius: 4,
    paddingHorizontal: 6,
    // ширина патча подгоняется авто через лейбл, поэтому дадим минимум
    minWidth: 10,
  },
  adornLeft: {
    position: "absolute",
    left: 12,
    height: 50,
    justifyContent: "center",
  },
  adornRight: {
    position: "absolute",
    right: 12,
    height: 50,
    justifyContent: "center",
  },
});

export default FloatingLabelInput;
// style={[
//           styles.input,
//           {
//             paddingLeft: 16,
//             paddingRight: 16,
//             backgroundColor: "transparent", // фикс, чтобы не было белого
//             color: "#fff", // цвет текста
//             fontSize: 16,
//           },
//           inputStyle,
//         ]}
