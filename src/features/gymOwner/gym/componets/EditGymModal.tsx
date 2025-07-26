import React from "react";
import { Modal, Portal } from "react-native-paper";
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
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{ padding: 20, backgroundColor: "white", margin: 16, borderRadius: 8 }}
      >
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
      </Modal>
    </Portal>
  );
};
