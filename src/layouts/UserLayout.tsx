import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomePage from "../features/user/home/pages/HomePage";
import ProfilePage from "../features/user/profile/pages/ProfilePage";
import EditProfilePage from "../features/user/profile/pages/EditProfilePage";
import GymsPage from "../features/user/gyms/pages/GymPage";
import GymDetailPage from "../features/user/gyms/components/GymDetailPage";
import BookingListPage from "../features/user/bookings/pages/BookingListPage";
import FavouritesPage from "../features/user/gyms/pages/FavouritesPage";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: true,
      headerTitleAlign: "center",
      tabBarStyle: {
        backgroundColor: "#fff",
        height: 65,
        paddingBottom: 8,
        paddingTop: 4,
      },
      tabBarLabelStyle: { fontSize: 12 },
      tabBarActiveTintColor: "#2ecc71",
      tabBarInactiveTintColor: "#7f8c8d",
      tabBarIcon: ({ color, size }) => {
        let iconName: string;

        switch (route.name) {
          case "Home":
            iconName = "home-outline";
            break;
          case "Gyms":
            iconName = "map-marker-outline";
            break;
          case "Bookings":
            iconName = "calendar-check-outline";
            break;
          case "Profile":
            iconName = "account-circle-outline";
            break;
          default:
            iconName = "help-circle-outline";
        }

        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomePage} />
    <Tab.Screen name="Gyms" component={GymsPage} />
    <Tab.Screen name="Bookings" component={BookingListPage} />
    <Tab.Screen name="Profile" component={ProfilePage} />
  </Tab.Navigator>
);

const UserLayout = () => {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Tabs" component={TabNavigator} />
          <Stack.Screen name="EditProfile" component={EditProfilePage} />
          <Stack.Screen name="GymDetail" component={GymDetailPage} />
          <Stack.Screen name="FavouritesPage" component={FavouritesPage} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default UserLayout;
