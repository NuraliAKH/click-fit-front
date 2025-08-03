import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CheckAuth } from "../features/auth/components/CheckAuth";
import LoginPage from "../features/auth/pages/LoginPage";
import { RoleBasedLayout } from "../layouts/RoleBasedLayout";
import RegisterPage from "../features/auth/pages/RegisterPage";

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
      <Stack.Screen name="UserLayout">
        {() => (
          <CheckAuth>
            <RoleBasedLayout />
          </CheckAuth>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
