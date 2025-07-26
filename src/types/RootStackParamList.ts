import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Login: undefined;
  UserLayout: NavigatorScreenParams<UserLayoutStackParamList>;
  AdminLayout: undefined;
  GymOwnerLayout: undefined;
};

export type UserLayoutStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  EditProfile: undefined;
};

export type TabParamList = {
  Home: undefined;
  Gyms: undefined;
  Bookings: undefined;
  Profile: undefined;
};

export type OwnerStackParamList = {
  Tabs: undefined;
  MyGyms: undefined;
  Bookings: undefined;
  // другие экраны...
};
