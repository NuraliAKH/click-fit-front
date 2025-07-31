import React from "react";
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { Modal, Layout } from "@ui-kitten/components";
import { GymForm } from "./GymForm";
import { CreateGym } from "../types/Gym";
import { useUpdateGym } from "../hooks";

interface Props {
  visible: boolean;
  onDismiss: () => void;
  onUpdate: (data: any) => void;
  gym: CreateGym;
}

export const EditGymModal: React.FC<Props> = ({ visible, onDismiss, onUpdate, gym }) => {
  const { mutate: updateGym } = useUpdateGym(gym.id);

  return (
    <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={onDismiss}>
      <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} style={styles.keyboardContainer}>
        <Layout style={styles.container} level="1">
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {gym && (
              <GymForm
                onSubmit={data => {
                  updateGym(data);
                  onUpdate(data);
                }}
                defaultValues={gym}
                isEdit
              />
            )}
          </ScrollView>
        </Layout>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    borderRadius: 8,
    width: "150%",
    maxHeight: screenHeight * 0.8,
  },
  keyboardContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingBottom: 100,
  },
});
