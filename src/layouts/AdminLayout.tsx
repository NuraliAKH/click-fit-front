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
import { PromoCodeList } from "../features/admin/settings/components/PromoCodeList";
import { ServiceCategoryList } from "../features/admin/settings/components/ServiceCategoryList";
import { AssignRolePage } from "../features/admin/settings/components/Roles";
import CustomHeader from "../components/CustomHeader";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AdminTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      header: () => <CustomHeader title={route.name} />,
      headerShown: true,
      headerTitleAlign: "center",
      tabBarStyle: {
        borderTopWidth: 1,
        borderTopColor: "#00B1E3",
        backgroundColor: "transparent",
        height: 65,
        paddingBottom: 8,
        paddingTop: 4,
      },
      tabBarLabelStyle: { fontSize: 12 },
      tabBarActiveTintColor: "#00B1E3",
      tabBarInactiveTintColor: "#ffffff",
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
          <Stack.Screen name="PromocodeSettings" component={PromoCodeList} />
          <Stack.Screen name="ServiceCategorySettings" component={ServiceCategoryList} />
          <Stack.Screen name="RoleSettings" component={AssignRolePage} />
          <Stack.Screen name="NotificationSettings" component={AmenitySettingsPage} />
          <Stack.Screen name="SystemInfo" component={AmenitySettingsPage} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default AdminLayout;
