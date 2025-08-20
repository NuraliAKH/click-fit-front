import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TopNavigation, TopNavigationAction, Layout, Text } from "@ui-kitten/components";
import Ionicons from "react-native-vector-icons/Ionicons";

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

  const BackIcon = () => <Ionicons name="arrow-back" size={24} color="#00B1E3" />;

  const renderBackAction = () => <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />;

  return (
    <Layout style={{ flex: 1, backgroundColor: "transparent" }}>
      <TopNavigation
        style={{ backgroundColor: "transparent" }}
        alignment="center"
        accessoryLeft={renderBackAction}
        title={() => <Text style={{ color: "#00B1E3", fontSize: 20, fontWeight: "bold" }}>Редактировать профиль</Text>}
      />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 32,
          backgroundColor: "transparent",
        }}
      >
        <EditProfileComponent onSubmit={onSave} {...rest} />
      </ScrollView>
    </Layout>
  );
};

export default EditProfilePage;
