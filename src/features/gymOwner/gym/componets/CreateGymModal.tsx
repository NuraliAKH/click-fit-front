import React from "react";
import { Modal, Portal } from "react-native-paper";
import { View } from "react-native";
import { GymForm } from "./GymForm";

interface Props {
  visible: boolean;
  onDismiss: () => void;
  onCreate: (data: any) => void;
}

export const CreateGymModal: React.FC<Props> = ({ visible, onDismiss, onCreate }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{ padding: 20, backgroundColor: "white", margin: 16, borderRadius: 8 }}
      >
        <GymForm onSubmit={onCreate} />
      </Modal>
    </Portal>
  );
};
