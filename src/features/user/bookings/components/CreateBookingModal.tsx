import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Modal, Card, Button, Input, Text, Select, SelectItem, IndexPath } from "@ui-kitten/components";
import { Controller, useForm } from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import UniversalModal from "../../../../components/Modal";
import FloatingLabelSelect from "../../../../components/Select";

type Service = {
  id: number;
  name: string;
};

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (data: { gymId: number; serviceId: number; bookingDate: Date; startTime: string }) => void;
  services: Service[];
  gymId: number;
};

type FormData = {
  serviceId: number;
  bookingDate: Date;
  startTime: string;
};

const CreateBookingModal = ({ visible, onDismiss, onSubmit, services, gymId }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [startTime, setStartTime] = useState<string>("");

  const handleBooking = (data: FormData) => {
    onSubmit({
      gymId,
      serviceId: data.serviceId,
      bookingDate: data.bookingDate,
      startTime: data.startTime,
    });
    onDismiss();
  };

  return (
    <UniversalModal
      visible={visible}
      title="Create Booking"
      backdropStyle={styles.backdrop}
      onClose={onDismiss}
      primaryAction={{ label: "Save", onPress: handleSubmit(handleBooking), disabled: !isValid }}
      secondaryAction={{ label: "Close", onPress: onDismiss }}
    >
      <Card disabled={true} style={styles.card}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
            <Controller
              control={control}
              name="serviceId"
              rules={{ required: "Please select a service" }}
              render={({ field: { onChange, value } }) => (
                <FloatingLabelSelect
                  containerStyle={{ marginTop: 5 }}
                  label="Choose service"
                  value={value ? String(value) : null}
                  onChange={onChange}
                  options={services.map(service => ({
                    label: service.name,
                    value: String(service.id),
                  }))}
                />
              )}
            />

            <Text category="label" style={{ marginTop: 16 }}>
              Booking Date
            </Text>
            <Controller
              control={control}
              name="bookingDate"
              rules={{ required: "Please select a date" }}
              render={({ field: { onChange, value } }) => (
                <>
                  <Button appearance="outline" onPress={() => setDatePickerVisible(true)} style={styles.input}>
                    {value ? value.toDateString() : "Choose Date"}
                  </Button>
                  <DateTimePickerModal
                    isVisible={datePickerVisible}
                    mode="date"
                    onConfirm={date => {
                      setDatePickerVisible(false);
                      onChange(date);
                    }}
                    onCancel={() => setDatePickerVisible(false)}
                    minimumDate={new Date()}
                  />
                  {errors.bookingDate && (
                    <Text status="danger" category="c1">
                      {errors.bookingDate.message}
                    </Text>
                  )}
                </>
              )}
            />

            <Text category="label" style={{ marginTop: 16 }}>
              Start Time
            </Text>
            <Controller
              control={control}
              name="startTime"
              rules={{ required: "Please select a time" }}
              render={({ field: { onChange, value } }) => (
                <>
                  <Button appearance="outline" onPress={() => setTimePickerVisible(true)} style={styles.input}>
                    {value || "Choose Time"}
                  </Button>
                  <DateTimePickerModal
                    isVisible={timePickerVisible}
                    mode="time"
                    onConfirm={date => {
                      const hours = date.getHours().toString().padStart(2, "0");
                      const minutes = date.getMinutes().toString().padStart(2, "0");
                      const formatted = `${hours}:${minutes}`;
                      setStartTime(formatted);
                      onChange(formatted);
                      setTimePickerVisible(false);
                    }}
                    onCancel={() => setTimePickerVisible(false)}
                    is24Hour={true}
                  />
                  {errors.startTime && (
                    <Text status="danger" category="c1">
                      {errors.startTime.message}
                    </Text>
                  )}
                </>
              )}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </Card>
    </UniversalModal>
  );
};

export default CreateBookingModal;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 0,
    alignSelf: "center",
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    marginTop: 4,
    marginBottom: 12,
  },
  backdrop: {
    backgroundColor: "transparent",
  },
});
