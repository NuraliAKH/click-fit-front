import React, { useEffect } from "react";
import { View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import EditProfileComponent from "../components/EditProfileComponent";
import useEditProfile from "../hooks/useEditProfile";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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

  return (
    <View style={{ flex: 1 }}>
      {/* Кнопка Назад */}
      <View style={{ padding: 10 }}>
        <Button title="Назад" onPress={() => navigation.goBack()} />
      </View>

      {/* Компонент формы */}
      <EditProfileComponent onSubmit={onSave} {...rest} />
    </View>
  );
};

export default EditProfilePage;
