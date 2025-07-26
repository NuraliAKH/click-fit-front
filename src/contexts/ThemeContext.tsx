import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  currentTheme: typeof DarkTheme | typeof DefaultTheme;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme on mount
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      setIsDarkMode(savedTheme === "dark");
    };
    loadTheme();
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => {
      const newTheme = !prev;
      AsyncStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  }, []);

  const currentTheme = isDarkMode ? DarkTheme : DefaultTheme;

  const value = {
    isDarkMode,
    toggleTheme,
    currentTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
