import React from "react";
import { Text, View } from "react-native";
import { Layout } from "@ui-kitten/components";
import GymCardsList from "../../../../components/GymCardsList";
import GymCard from "../../../../components/GymCard";
import { useFetchAllGym } from "../../../gymOwner/gym/hooks";

const HomePage = () => {
  const { data, isLoading } = useFetchAllGym();
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <Layout style={{ flex: 1, backgroundColor: "transparent" }}>
      <GymCardsList title="New Gyms">
        {data?.map((gym: any) => {
          const mainImage = gym.images?.find((img: any) => img.isMain)?.url;
          const imageUrl = mainImage || "https://via.placeholder.com/100";
          return (
            <GymCard
              key={gym.id}
              title={gym.name}
              image={imageUrl}
              subtitle={gym.description || "Самостоятельные занятия в тренажорном зале"}
            />
          );
        })}
      </GymCardsList>
    </Layout>
  );
};

export default HomePage;
