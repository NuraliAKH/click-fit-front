import React from "react";
import { View } from "react-native";
import { useUserProfile } from "../hooks/useUserProfile";
import { styles } from "../styles/profileStyles";
import ProfileComponent from "../components/ProfileComponent";

const ProfilePage = () => {
  const { data, isLoading } = useUserProfile();
  return (
    <View style={styles.container}>
      <ProfileComponent user={data?.data} loading={isLoading} />
    </View>
  );
};

export default ProfilePage;
