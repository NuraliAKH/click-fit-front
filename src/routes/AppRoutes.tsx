// ❌ УДАЛИ NavigationContainer отсюда, если он уже в App.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CheckAuth } from "../features/auth/components/CheckAuth";
import LoginPage from "../features/auth/pages/LoginPage";
import UserLayout from "../layouts/UserLayout";
import GymOwnerLayout from "../layouts/GymOwnerLayout";

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="UserLayout">
        {() => (
          <CheckAuth>
            <GymOwnerLayout />
          </CheckAuth>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
