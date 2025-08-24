import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import OwnerHomePage from "../features/gymOwner/home/pages/OwnerHomePage";
import { GymsListScreen } from "../features/gymOwner/gym/pages/GymsPage";
import { GymDetailedPage } from "../features/gymOwner/gym/pages/GymDetailedPage";
import CustomHeader from "../components/CustomHeader"; // same as UserLayout

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const GymOwnerTabs = ({ navigation }: any) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      header: () => (
        <CustomHeader
          title={route.name}
          onPressFavourites={() => console.log("Owner Favourites clicked")}
          onPressNotifications={() => console.log("Owner Notifications clicked")}
        />
      ),
      tabBarStyle: {
        borderTopWidth: 1,
        borderTopColor: "#00B1E3", // match UserLayout
        backgroundColor: "transparent",
        height: 65,
        paddingBottom: 8,
        paddingTop: 4,
        elevation: 0,
      },
      tabBarLabelStyle: { fontSize: 12 },
      tabBarActiveTintColor: "#00B1E3", // match UserLayout
      tabBarInactiveTintColor: "#ffffff", // match UserLayout
      tabBarIcon: ({ color, size }) => {
        let iconName: string;

        switch (route.name) {
          case "Dashboard":
            iconName = "view-dashboard-outline";
            break;
          case "My Gyms":
            iconName = "dumbbell";
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
    <Tab.Screen name="My Gyms" component={GymsListScreen} />
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
          <Stack.Screen name="GymDetailed" component={GymDetailedPage} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default GymOwnerLayout;
