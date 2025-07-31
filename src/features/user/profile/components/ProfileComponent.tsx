import React from "react";
import { Image } from "react-native";
import { Layout, Text, Spinner, Button, Icon } from "@ui-kitten/components";
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
      <Image source={{ uri: user?.avatarUrl || "https://ui-avatars.com/api/?name=User" }} style={styles.avatar} />
      <Text category="h6" style={styles.name}>
        {user?.firstName || "Имя"} {user?.lastName || "Фамилия"}
      </Text>
      <Text appearance="hint" style={styles.email}>
        {user?.email}
      </Text>
      <Text appearance="hint" style={styles.phone}>
        {user?.phone}
      </Text>

      <Button
        accessoryLeft={() => <FeatherIcon name="edit" size={20} color="#fff" />}
        style={styles.editButton}
        onPress={() => navigation.navigate("EditProfile")}
      >
        Изменить
      </Button>
    </Layout>
  );
};

export default ProfileComponent;
