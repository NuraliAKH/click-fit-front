import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import OwnerHomePage from "../features/gymOwner/home/pages/OwnerHomePage";
import { GymsListScreen } from "../features/gymOwner/gym/pages/GymsPage";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const GymOwnerTabs = () => (
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
          case "MyGyms":
            iconName = "dumbbell";
            break;
          case "Bookings":
            iconName = "clipboard-check-outline";
            break;
          case "OwnerProfile":
            iconName = "account-cog-outline";
            break;
          default:
            iconName = "help-circle-outline";
        }

        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Dashboard" component={OwnerHomePage} />
    <Tab.Screen name="MyGyms" component={GymsListScreen} />
    <Tab.Screen name="Bookings" component={OwnerHomePage} />
    <Tab.Screen name="OwnerProfile" component={OwnerHomePage} />
  </Tab.Navigator>
);

const GymOwnerLayout = () => {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Tabs" component={GymOwnerTabs} />
          <Stack.Screen name="EditProfile" component={OwnerHomePage} />
          <Stack.Screen name="GymDetail" component={OwnerHomePage} />
          {/* другие страницы, например CreateGym, EditGym и т.д. */}
        </Stack.Navigator>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default GymOwnerLayout;
