import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Pages
import { UsersListPage } from "../features/admin/users/pages/UsersPage";
import { AdminDashboardPage } from "../features/admin/dashboard/pages/AdminDashboardPage";
import { AdminSettingsPage } from "../features/admin/settings/pages/AdminSettingsPage";

import { AmenitySettingsPage } from "../features/admin/settings/pages/AmenitySettingsPage";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AdminTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: true,
      headerTitleAlign: "center",
      tabBarStyle: {
        backgroundColor: "#fff",
        height: 65,
        paddingBottom: 8,
        paddingTop: 4,
        borderTopWidth: 0.5,
        borderTopColor: "#ecf0f1",
      },
      tabBarLabelStyle: { fontSize: 12 },
      tabBarActiveTintColor: "#2ecc71",
      tabBarInactiveTintColor: "#7f8c8d",
      tabBarIcon: ({ color, size }) => {
        let iconName: string;

        switch (route.name) {
          case "Dashboard":
            iconName = "view-dashboard-outline";
            break;
          case "Users":
            iconName = "account-group-outline";
            break;
          case "Settings":
            iconName = "cog-outline";
            break;
          default:
            iconName = "help-circle-outline";
        }

        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Dashboard" component={AdminDashboardPage} />
    <Tab.Screen name="Users" component={UsersListPage} />
    <Tab.Screen name="Settings" component={AdminSettingsPage} />
  </Tab.Navigator>
);

const AdminLayout = () => {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AdminTabs" component={AdminTabs} />

          {/* Additional Settings Pages */}
          <Stack.Screen name="AmenitySettings" component={AmenitySettingsPage} />
          <Stack.Screen name="PromocodeSettings" component={AmenitySettingsPage} />
          <Stack.Screen name="ServiceCategorySettings" component={AmenitySettingsPage} />
          <Stack.Screen name="RoleSettings" component={AmenitySettingsPage} />
          <Stack.Screen name="NotificationSettings" component={AmenitySettingsPage} />
          <Stack.Screen name="SystemInfo" component={AmenitySettingsPage} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default AdminLayout;
