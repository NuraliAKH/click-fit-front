import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Platform, KeyboardAvoidingView } from "react-native";
import { Modal, Portal, Button, Text, Menu, HelperText } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { TimePickerModal, DatePickerModal } from "react-native-paper-dates";
import { en, registerTranslation } from "react-native-paper-dates";

registerTranslation("en", en);

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
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const selectedService = services.find(s => s.id === control._formValues?.serviceId);

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
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContainer}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ width: "100%" }}>
          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Create Booking</Text>

            <Text style={styles.label}>Select Service</Text>
            <Controller
              control={control}
              name="serviceId"
              rules={{ required: "Please select a service" }}
              render={({ field: { value } }) => (
                <Menu
                  visible={menuVisible}
                  onDismiss={() => setMenuVisible(false)}
                  anchor={
                    <Button mode="outlined" onPress={() => setMenuVisible(true)} style={styles.dropdown}>
                      {selectedService?.name || "Choose service"}
                    </Button>
                  }
                >
                  {services.map(service => (
                    <Menu.Item
                      key={service.id}
                      onPress={() => {
                        setValue("serviceId", service.id);
                        setMenuVisible(false);
                      }}
                      title={service.name}
                    />
                  ))}
                </Menu>
              )}
            />
            {errors.serviceId && <HelperText type="error">{errors.serviceId.message}</HelperText>}

            <Text style={styles.label}>Booking Date</Text>
            <Controller
              control={control}
              name="bookingDate"
              rules={{ required: "Please select a date" }}
              render={({ field: { value, onChange } }) => (
                <>
                  <Button
                    mode="outlined"
                    onPress={() => setDatePickerVisible(true)}
                    style={styles.dropdown}
                    icon="calendar"
                    textColor={value ? "#000" : "#999"}
                    contentStyle={{ justifyContent: "flex-start" }}
                    labelStyle={{ textAlign: "left", width: "100%" }}
                  >
                    {value ? value.toLocaleDateString() : "Choose date"}
                  </Button>
                  <Portal>
                    <DatePickerModal
                      locale="en"
                      mode="single"
                      visible={datePickerVisible}
                      onDismiss={() => setDatePickerVisible(false)}
                      date={value}
                      onConfirm={({ date }) => {
                        setDatePickerVisible(false);
                        onChange(date);
                      }}
                      validRange={{
                        startDate: new Date(),
                      }}
                    />
                  </Portal>
                </>
              )}
            />
            {errors.bookingDate && <HelperText type="error">{errors.bookingDate.message}</HelperText>}

            <Text style={styles.label}>Start Time</Text>
            <Controller
              control={control}
              name="startTime"
              rules={{ required: "Please select a time" }}
              render={({ field: { value, onChange } }) => (
                <>
                  <Button mode="outlined" onPress={() => setTimePickerVisible(true)} style={styles.dropdown}>
                    {value || "Choose time"}
                  </Button>
                  <TimePickerModal
                    visible={timePickerVisible}
                    onDismiss={() => setTimePickerVisible(false)}
                    onConfirm={({ hours, minutes }) => {
                      const timeStr = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
                      onChange(timeStr);
                      setTimePickerVisible(false);
                    }}
                    hours={12}
                    minutes={0}
                  />
                </>
              )}
            />
            {errors.startTime && <HelperText type="error">{errors.startTime.message}</HelperText>}

            <View style={styles.buttons}>
              <Button onPress={onDismiss} style={styles.cancelBtn}>
                Cancel
              </Button>
              <Button mode="contained" onPress={handleSubmit(handleBooking)} style={styles.submitBtn}>
                Book Now
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
};

export default CreateBookingModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 20,
    width: "90%",
    alignSelf: "center",
    maxHeight: "90%",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  dropdown: {
    justifyContent: "center",
    marginBottom: 12,
    borderRadius: 8,
  },
  input: {
    marginBottom: 12,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 24,
  },
  cancelBtn: {
    marginRight: 12,
  },
  submitBtn: {
    backgroundColor: "#2ecc71",
  },
});
