import React from "react";
import { View, Text, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { styles } from "../styles/profileStyles";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserLayoutStackParamList } from "../../../../types/RootStackParamList";

interface Props {
  user: any;
  loading: boolean;
  onEdit?: () => void;
}

const ProfileComponent = ({ user, loading, onEdit }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<UserLayoutStackParamList>>();
  if (loading) {
    return <ActivityIndicator style={{ marginTop: 100 }} size="large" color="#0EA5E9" />;
  }

  return (
    <View style={styles.profileCard}>
      <Image source={{ uri: user?.avatarUrl || "https://ui-avatars.com/api/?name=User" }} style={styles.avatar} />
      <Text style={styles.name}>
        {user?.firstName || "Имя"} {user?.lastName || "Фамилия"}
      </Text>
      <Text style={styles.email}>{user?.email}</Text>
      <Text style={styles.phone}>{user?.phone}</Text>

      <TouchableOpacity onPress={onEdit} style={styles.editButton}>
        <Icon name="edit" size={18} color="#fff" />
        <Text style={styles.editButtonText} onPress={() => navigation.navigate("EditProfile")}>
          Изменить
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileComponent;
