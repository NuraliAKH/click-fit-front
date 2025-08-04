import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Layout, Text, Button, CheckBox } from "@ui-kitten/components";
import { useFetchAllAmenity } from "../../../admin/settings/hooks/amenityHooks";
import { useCreateGymAmenity, useDeleteGymAmenity, useFetchGymAmenityById } from "../hooks/gymAmenity.hook";

type Props = {
  gymId: number;
};

export const GymAmenityManager = ({ gymId }: Props) => {
  const { data: allAmenities } = useFetchAllAmenity();
  type GymAmenity = { id: number; amenityId: number; [key: string]: any };
  const { data: rawAmenities = {} } = useFetchGymAmenityById(gymId);
  const gymAmenities: GymAmenity[] = Object.values(rawAmenities);
  console.log("Gym Amenities:", gymAmenities);

  const { mutate: createAmenity } = useCreateGymAmenity();
  const { mutate: deleteAmenity } = useDeleteGymAmenity();
  const gymAmenityIds: number[] = (gymAmenities ?? []).map((a: any) => a.amenityId); // assuming response shape

  const toggleAmenity = (amenityId: number) => {
    const isAttached = gymAmenityIds.includes(amenityId);

    if (isAttached) {
      const gymAmenity = gymAmenities.find((a: any) => a.amenityId === amenityId);
      if (gymAmenity) {
        Alert.alert("Удалить удобство?", "Вы уверены?", [
          { text: "Отмена", style: "cancel" },
          {
            text: "Удалить",
            style: "destructive",
            onPress: () => deleteAmenity({ gymId, amenityId: gymAmenity.amenityId }),
          },
        ]);
      }
    } else {
      createAmenity({ gymId, amenityId });
    }
  };

  return (
    <Layout style={styles.container}>
      <Text category="h6" style={styles.title}>
        Удобства спортзала
      </Text>

      {allAmenities?.data.map((amenity: any) => {
        const isChecked = gymAmenityIds.includes(amenity.id);
        return (
          <CheckBox
            key={amenity.id}
            checked={isChecked}
            onChange={() => toggleAmenity(amenity.id)}
            style={styles.checkbox}
          >
            {amenity.name}
          </CheckBox>
        );
      })}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 12,
  },
  checkbox: {
    marginBottom: 8,
  },
});
