import React from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { Layout, Text, Spinner } from "@ui-kitten/components";
import { styles } from "../styles/profileStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserLayoutStackParamList } from "../../../../types/RootStackParamList";
import FeatherIcon from "react-native-vector-icons/Feather";

interface Props {
  user: any;
  loading: boolean;
}

const ProfileComponent = ({ user, loading }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<UserLayoutStackParamList>>();

  if (loading) {
    return (
      <Layout style={styles.loader}>
        <Spinner size="giant" />
      </Layout>
    );
  }

  return (
    <Layout style={styles.profileCard}>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: "#00B1E3",
          borderRadius: 20,
          padding: 6,
        }}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <FeatherIcon name="edit-2" size={18} color="#fff" />
      </TouchableOpacity>

      <View style={{ alignItems: "center", marginBottom: 16 }}>
        <Image source={{ uri: user?.avatarUrl || "https://ui-avatars.com/api/?name=User" }} style={styles.avatar} />
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 10,
            bottom: 0,
            backgroundColor: "#00B1E3",
            borderRadius: 20,
            padding: 6,
          }}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <FeatherIcon name="camera" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Fields */}
      <Text category="h6" style={styles.name}>
        {user?.firstName || "Имя"} {user?.lastName || "Фамилия"}
      </Text>
      <Text appearance="hint" style={styles.email}>
        {user?.email}
      </Text>
      <Text appearance="hint" style={styles.phone}>
        {user?.phone}
      </Text>
    </Layout>
  );
};

export default ProfileComponent;
