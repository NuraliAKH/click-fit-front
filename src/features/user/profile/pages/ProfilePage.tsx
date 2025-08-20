import React from "react";
import { ScrollView } from "react-native";
import { Layout } from "@ui-kitten/components";
import { useUserProfile } from "../hooks/useUserProfile";
import ProfileComponent from "../components/ProfileComponent";

const ProfilePage = () => {
  const { data, isLoading } = useUserProfile();

  return (
    <Layout style={{ flex: 1, backgroundColor: "transparent" }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}>
        <ProfileComponent user={data?.data} loading={isLoading} />
      </ScrollView>
    </Layout>
  );
};

export default ProfilePage;
