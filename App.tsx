import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { ThemeProvider, useTheme } from "./src/contexts/ThemeContext";
import AppRoutes from "./src/routes/AppRoutes";
import { SocketProvider } from "./src/hooks/useSocket";
import { DefaultTheme, DarkTheme, Theme as NavigationTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient();

const ThemedApp = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  useEffect(() => {
    toggleTheme("dark");
  }, []);

  const baseTheme = isDarkMode ? DarkTheme : DefaultTheme;
  const evaTheme = isDarkMode ? eva.dark : eva.light;

  const theme: NavigationTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      background: isDarkMode ? "#191A27" : "#FFFFFF",
      primary: "#0EA5E9",
      text: isDarkMode ? "#E2E8F0" : "#1E293B",
      card: isDarkMode ? "#1E293B" : "#FFFFFF",
      border: isDarkMode ? "#334155" : "#D1D5DB",
    },
  };

  return (
    <ApplicationProvider {...eva} theme={evaTheme}>
      <NavigationContainer theme={theme}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={["top", "bottom"]}>
            <AppRoutes />
            <Toast />
          </SafeAreaView>
        </SafeAreaProvider>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <SocketProvider>
          <ThemedApp />
        </SocketProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
