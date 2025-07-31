import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TopNavigation, TopNavigationAction, Icon, Layout } from "@ui-kitten/components";

import EditProfileComponent from "../components/EditProfileComponent";
import useEditProfile from "../hooks/useEditProfile";
import { RootStackParamList } from "../../../../types/RootStackParamList";

const EditProfilePage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { onSave, success, ...rest } = useEditProfile();

  useEffect(() => {
    if (success) {
      navigation.navigate("UserLayout", {
        screen: "Tabs",
        params: { screen: "Profile" },
      });
    }
  }, [success]);

  const BackIcon = (props: any) => <Icon {...props} name="arrow-back-outline" />;

  const renderBackAction = () => <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />;

  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigation alignment="center" title="Редактировать профиль" accessoryLeft={renderBackAction} />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}>
        <EditProfileComponent onSubmit={onSave} {...rest} />
      </ScrollView>
    </Layout>
  );
};

export default EditProfilePage;
