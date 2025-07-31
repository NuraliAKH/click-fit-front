import React from "react";
import { StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from "react-native";
import { Modal, Layout } from "@ui-kitten/components";
import { GymForm } from "./GymForm";

interface Props {
  visible: boolean;
  onDismiss: () => void;
  onCreate: (data: any) => void;
}

export const CreateGymModal: React.FC<Props> = ({ visible, onDismiss, onCreate }) => {
  return (
    <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={onDismiss}>
      <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} style={styles.keyboardContainer}>
        <Layout style={styles.container} level="1">
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <GymForm onSubmit={onCreate} />
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
  keyboardContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "150%",
    maxHeight: screenHeight * 0.8,
    borderRadius: 12,
  },
  scrollContent: {
    paddingBottom: 24,
  },
});
