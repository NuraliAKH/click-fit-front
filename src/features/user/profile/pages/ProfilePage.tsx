import React from "react";
import { ScrollView } from "react-native";
import { Layout, TopNavigation, TopNavigationAction, Icon } from "@ui-kitten/components";
import { useUserProfile } from "../hooks/useUserProfile";
import ProfileComponent from "../components/ProfileComponent";

const ProfilePage = () => {
  const { data, isLoading } = useUserProfile();

  const BackIcon = (props: any) => <Icon {...props} name="arrow-back-outline" />;
  const renderBackAction = () => null; // Пусто, если не нужен назад, можно добавить при необходимости

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}>
        <ProfileComponent user={data?.data} loading={isLoading} />
      </ScrollView>
    </Layout>
  );
};

export default ProfilePage;
